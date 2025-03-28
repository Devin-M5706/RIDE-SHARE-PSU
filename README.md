# RIDE-SHARE-PSU

A full-stack ride-share app with a Django + Firebase backend and a React + Tailwind CSS frontend.

---

## 🚀 Backend (Django + Firebase)

This is a Django-based backend for a ride-share application that integrates Firebase for authentication and real-time updates.

### ✅ Requirements

- Python (>=3.x)
- Virtual Environment (venv)
- Django
- Django REST Framework
- Firebase Admin SDK

### ⚙️ Installation

#### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd ride-share-backend
```

#### 2️⃣ Set Up Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate      # On Windows
source venv/bin/activate   # On macOS/Linux
```

#### 3️⃣ Install Dependencies

```bash
pip install django djangorestframework firebase-admin
```

#### 4️⃣ Set Up Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a project and enable **Authentication**
- Download the **Admin SDK JSON**
- Place it in your project folder and update your backend code to reference it

#### 5️⃣ Run Migrations

```bash
python manage.py migrate
```

#### 6️⃣ Run the Backend

```bash
python manage.py runserver
```

### 🧪 API Endpoints

- `GET/POST /api/rides/` — Manage rides
- `POST /api/rides/{id}/accept_ride/` — Accept a ride as a driver

---

## 💻 Frontend (React + Vite + Tailwind CSS)

This frontend is built with **React**, styled with **Tailwind CSS**, and uses **React Router** for routing.

### 🔧 Setup Instructions

#### 1️⃣ Navigate to the frontend directory

```bash
cd ride-share-frontend
```

#### 2️⃣ Install dependencies

```bash
npm install
```

#### 3️⃣ Start the frontend dev server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### 🔀 Routes

- `/` — **Login Page** (mock login with role selection)
- `/driver` — **Driver Dashboard** (view and accept rides)
- `/passenger` — **Passenger Dashboard** (request and view ride history)

### 🌐 Frontend–Backend Integration

- Frontend fetches ride data from `http://localhost:8000/api/rides/`
- Mock login saves a token to `localStorage`
- Firebase Auth integration can be added later for production

### 📦 Stack Summary

- **Backend:** Django + Firebase Admin SDK
- **Frontend:** Vite + React + Tailwind CSS
- **Routing:** React Router
- **Auth:** Mock token for now (JWT via Firebase in future)
- **API Communication:** REST using `fetch()`

---

Enjoy the ride-share app! 🚗🚀
