# Weather Planning App

A React-based web application that helps users plan events around weather conditions by integrating weather forecasts with calendar scheduling.

## 🌟 Features

- **Weather-Aware Event Planning**: Create events that automatically suggest optimal dates based on weather preferences
- **Real-time Calendar Views**: Week and month calendar views with interactive date selection
- **Firebase Authentication**: Secure user registration and login system
- **Real-time Data Sync**: Events sync across devices using Firebase Realtime Database
- **Weather Integration**: Uses OpenMeteo API for accurate weather forecasts
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Smart Recommendations**: AI-powered suggestions for the best times to schedule outdoor activities

## 🚀 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database
- **Weather API**: OpenMeteo
- **Routing**: React Router DOM
- **Testing**: Jest, React Testing Library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-planning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Firebase configuration in `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_DATABASE_URL=your_database_url
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Alert.jsx       # Alert/notification component
│   ├── Calendar.jsx    # Main calendar wrapper
│   ├── Login.jsx       # Authentication component
│   ├── NewEvent.jsx    # Event creation form
│   └── ...
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   └── EventsContext.jsx # Events state
├── services/           # API and service layers
│   ├── authService.js  # Firebase Auth wrapper
│   └── databaseService.js # Firebase Database wrapper
├── utils/              # Utility functions
│   └── weatherService.js # Weather API integration
├── config/             # Configuration files
│   └── firebase.js     # Firebase configuration
└── tests/              # Test files
    ├── components/     # Component tests
    ├── services/       # Service tests
    └── utils/          # Utility tests
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode

## 🌤️ How It Works

1. **User Authentication**: Users sign up/login with email and password
2. **Event Creation**: Users can create either:
   - **Manual Events**: Schedule events at specific times
   - **Automatic Events**: Let the app suggest optimal times based on weather preferences
3. **Weather Analysis**: The app fetches weather forecasts and analyzes conditions
4. **Smart Scheduling**: For automatic events, the app finds the best dates/times matching user preferences
5. **Real-time Sync**: All events sync across devices using Firebase Realtime Database

## 🔐 Security Features

- Firebase Security Rules for database access control
- Environment variables for sensitive configuration
- Protected routes requiring authentication
- Input validation and sanitization

## 🚀 Deployment

The app is configured for Firebase Hosting:

```bash
npm run build
firebase deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Kris Tong** - Initial work
- **Ethan Chen** - Development and testing
- **Emily Kim** - UI/UX design

## 🙏 Acknowledgments

- OpenMeteo for providing free weather data
- Firebase for backend services
- React and Vite communities for excellent tooling