# Penn State Ride-Share Frontend (Drivu)

This is the frontend application for Drivu - Penn State's premium ride-sharing platform, built with React, TypeScript, and Material-UI.

![Drivu Welcome Page](./public/assets/welcome-page.png)

Your premium ride-sharing experience at Penn State. Safe, reliable, and convenient.

## Key Features

![Feature Cards](./public/assets/feature-cards.png)

- **Easy Ride Booking**: Book your ride in just a few clicks with our user-friendly interface
- **Trusted Drivers**: Our drivers are verified and rated by the community for your safety
- **Quick Pickup**: Get picked up quickly by nearby available drivers
- **Safe Travel**: Track your ride in real-time and share your location with friends

## Technical Features

- **User Authentication**: Secure login and registration system with PSU email validation
- **Ride Management**: Post, search, and book rides with interactive forms and listings
- **Real-time Messaging**: Communicate with drivers and riders
- **Interactive Maps**: Integration with Google Maps for location selection
- **Responsive Design**: Mobile-friendly interface using Material-UI components
- **Type Safety**: Built with TypeScript for better development experience

## Tech Stack

- React 18
- TypeScript
- Material-UI (MUI)
- Firebase Authentication
- Google Maps API
- Vite (Build Tool)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project credentials
- Google Maps API key

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd ride-share-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a `.env` file in the root directory with your environment variables:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
# or
yarn build
```

Preview the production build:
```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── auth/          # Authentication components
│   ├── layout/        # Layout components
│   ├── rides/         # Ride-related components
│   └── shared/        # Shared UI components
├── pages/             # Page components
├── services/          # API and service integrations
├── contexts/          # React contexts
├── hooks/             # Custom hooks
├── utils/             # Utility functions
└── types/             # TypeScript type definitions
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request

## License

This project is part of the Penn State Ride-Share application and is licensed under the MIT License.

## Contact

For questions or support, please contact the project maintainer:
- Devin Myers
- Penn State University
