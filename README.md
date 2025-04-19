# Penn State Ride-Share Application

A full-stack application that connects Penn State students for ride-sharing services, making transportation more accessible for international and domestic students.
![Screenshot 20![Screenshot 2025-04-19 014517](https://github.com/user-attachments/assets/472392da-8061-4218-9090-24ad52c9b188)
25-04-19 014510](https://github.com/user-attachments/assets/df4c8362-e855-490e-baab-e37824abd357)

## Features

- **User Authentication**
  - PSU-specific email verification
  - Secure login/signup system
  - Role-based access (drivers/passengers)

- **Ride Management**
  - Post ride offers and requests
  - Search available rides
  - Real-time ride status updates
  - Location-based matching

- **Messaging System**
  - Real-time chat between users
  - Ride-specific conversations
  - Message notifications

- **Payment System**
  - Secure payment processing
  - Multiple payment options
  - Transaction history

- **Review System**
  - Rate and review drivers/passengers
  - Build trust within the community
  - View user ratings and feedback

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components
- React Router for navigation
- Firebase Authentication
- Real-time messaging with Firebase

### Backend
- Node.js with Express
- TypeScript for type safety
- MongoDB for database
- Firebase Admin SDK

## Project Structure

```
RIDE-SHARE-PSU/
├── frontend/                # React frontend application
│   ├── public/             # Static files
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                # Node.js backend application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── services/      # Business logic
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Firebase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/Devin-M5706/RIDE-SHARE-PSU.git
cd RIDE-SHARE-PSU
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

4. Set up environment variables
- Create `.env` files in both frontend and backend directories
- Add necessary environment variables (see `.env.example` files)

5. Start the development servers
```bash
# In frontend directory
npm start

# In backend directory
npm run dev
```

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Document complex functions and components

### Branch Strategy
- `main`: Production-ready code
- `develop`: Development branch
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Devin Myers - [GitHub](https://github.com/Devin-M5706)
