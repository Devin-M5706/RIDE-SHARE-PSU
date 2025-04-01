import firebase_admin
from django.contrib.auth.models import User
from django.db import models
from django.core.exceptions import ValidationError
from firebase_admin import auth, credentials, firestore
from rest_framework import permissions, serializers, viewsets, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import datetime

# Initialize Firebase
cred = credentials.Certificate("path/to/your/firebase_credentials.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Models
#This Ride model tracks each ride request.
#It stores the driver, passenger, pickup/dropoff locations, and ride status (e.g., requested, accepted, completed).
#The timestamp records when the ride was created.
class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    vehicle_info = models.CharField(max_length=255)
    is_available = models.BooleanField(default=True)
    rating = models.FloatField(default=0.0)
    total_rides = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.vehicle_info}"

#This Ride model tracks each ride request.
#It stores the driver, passenger, pickup/dropoff locations, and ride status (e.g., requested, accepted, completed).
#The timestamp records when the ride was created.
class Ride(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, blank=True)
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    pickup_lat = models.FloatField(null=True, blank=True)
    pickup_lng = models.FloatField(null=True, blank=True)
    dropoff_lat = models.FloatField(null=True, blank=True)
    dropoff_lng = models.FloatField(null=True, blank=True)
    status = models.CharField(
        max_length=50,
        choices=[
            ('requested', 'Requested'),
            ('accepted', 'Accepted'),
            ('in_progress', 'In Progress'),
            ('completed', 'Completed'),
            ('cancelled', 'Cancelled')
        ],
        default='requested'
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    estimated_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    actual_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    distance = models.FloatField(null=True)
    duration = models.IntegerField(null=True)

    def clean(self):
        if self.status == 'completed' and not self.actual_price:
            raise ValidationError('Actual price must be set when completing a ride')

    def __str__(self):
        return f"Ride {self.id} - {self.passenger.username}"

# Serializers
class DriverSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Driver
        fields = ['id', 'username', 'vehicle_info', 'is_available', 'rating', 'total_rides', 'created_at']

class RideSerializer(serializers.ModelSerializer):
    passenger_username = serializers.CharField(source='passenger.username', read_only=True)
    driver_username = serializers.CharField(source='driver.user.username', read_only=True)
    
    class Meta:
        model = Ride
        fields = '__all__'

# ViewSets
class RideViewSet(viewsets.ModelViewSet):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'driver'):
            return Ride.objects.filter(driver=user.driver)
        return Ride.objects.filter(passenger=user)

    @action(detail=True, methods=['post'])
    def accept_ride(self, request, pk=None):
        try:
            ride = self.get_object()
            driver = Driver.objects.get(user=request.user)
            
            if not driver.is_available:
                return Response(
                    {'error': 'Driver is not available'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            if ride.status != 'requested':
                return Response(
                    {'error': 'Ride is not in requested state'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            ride.driver = driver
            ride.status = 'accepted'
            ride.save()

            # Update Firebase
            db.collection('rides').document(str(ride.id)).set({
                'status': 'accepted',
                'driver': driver.user.username,
                'updated_at': datetime.now().isoformat()
            })

            return Response({'status': 'Ride Accepted'})
        except Driver.DoesNotExist:
            return Response(
                {'error': 'Driver profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['post'])
    def start_ride(self, request, pk=None):
        ride = self.get_object()
        if ride.driver.user != request.user:
            return Response(
                {'error': 'Not authorized to start this ride'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        ride.status = 'in_progress'
        ride.save()
        return Response({'status': 'Ride Started'})

    @action(detail=True, methods=['post'])
    def complete_ride(self, request, pk=None):
        ride = self.get_object()
        if ride.driver.user != request.user:
            return Response(
                {'error': 'Not authorized to complete this ride'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        actual_price = request.data.get('actual_price')
        if not actual_price:
            return Response(
                {'error': 'Actual price is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        ride.actual_price = actual_price
        ride.status = 'completed'
        ride.save()

        # Update driver stats
        driver = ride.driver
        driver.total_rides += 1
        driver.save()

        return Response({'status': 'Ride Completed'})

    @action(detail=True, methods=['post'])
    def cancel_ride(self, request, pk=None):
        ride = self.get_object()
        if ride.passenger != request.user and ride.driver.user != request.user:
            return Response(
                {'error': 'Not authorized to cancel this ride'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        ride.status = 'cancelled'
        ride.save()
        return Response({'status': 'Ride Cancelled'})

# Firebase Authentication Middleware
class FirebaseAuthentication(TokenAuthentication):
    def authenticate(self, request):
        id_token = request.headers.get('Authorization')
        if not id_token:
            return None
        try:
            decoded_token = auth.verify_id_token(id_token)
            user, created = User.objects.get_or_create(username=decoded_token['uid'])
            return (user, None)
        except Exception as e:
            return None

# Register in Django URLs
from django.urls import include, path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'rides', RideViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
