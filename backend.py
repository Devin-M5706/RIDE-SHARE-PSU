import firebase_admin
from django.contrib.auth.models import User
from django.db import models
from firebase_admin import auth, credentials, firestore
from rest_framework import permissions, serializers, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.response import Response

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

#This Ride model tracks each ride request.
#It stores the driver, passenger, pickup/dropoff locations, and ride status (e.g., requested, accepted, completed).
#The timestamp records when the ride was created.
class Ride(models.Model):
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, blank=True)
    passenger = models.ForeignKey(User, on_delete=models.CASCADE)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=[('requested', 'Requested'), ('accepted', 'Accepted'), ('completed', 'Completed')], default='requested')
    timestamp = models.DateTimeField(auto_now_add=True)

# Serializers
class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'

class RideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ride
        fields = '__all__'

# ViewSets
class RideViewSet(viewsets.ModelViewSet):
    queryset = Ride.objects.all()
    serializer_class = RideSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    @action(detail=True, methods=['post'])
    def accept_ride(self, request, pk=None):
        ride = self.get_object()
        driver = Driver.objects.get(user=request.user)
        ride.driver = driver
        ride.status = 'accepted'
        ride.save()
        db.collection('rides').document(str(ride.id)).set({
            'status': 'accepted',
            'driver': driver.user.username
        })
        return Response({'status': 'Ride Accepted'})

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
