# RIDE-SHARE-PSU
# Ride Share Backend

This is a Django-based backend for a ride-share application that integrates Firebase for authentication and real-time updates.

## Requirements

Before running the project, ensure you have the following installed:

- Python (>=3.x)
- Virtual Environment (venv)
- Django
- Django REST Framework
- Firebase Admin SDK

## Installation

### 1️⃣ Clone the Repository
```sh
git clone <repository-url>
cd ride-share-backend
```

### 2️⃣ Set Up Virtual Environment
```sh
python -m venv venv
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On macOS/Linux
```

### 3️⃣ Install Dependencies
```sh
pip install django djangorestframework firebase-admin
```

### 4️⃣ Set Up Firebase
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project and enable authentication
- Download the **Firebase Admin SDK JSON**
- Place it inside the project directory and update `manage.py` to point to it

### 5️⃣ Run Migrations
```sh
python manage.py migrate
```

### 6️⃣ Run the Development Server
```sh
python manage.py runserver
```

## API Endpoints
- `/api/rides/` - Manage rides
- `/api/rides/{id}/accept_ride/` - Accept a ride as a driver

## Notes
- Make sure you are in the correct directory before running commands.
- If Django is not installed, check your virtual environment with `where python` or `which python`.

Enjoy the ride-share app! 🚀

