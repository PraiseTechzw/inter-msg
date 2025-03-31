# A Complete Social Media & Messaging App



Soro is a comprehensive social media application that integrates the best features from platforms like TikTok, Instagram, Facebook, and Reddit. Designed as both a functional application and an educational tool, Soro demonstrates modern mobile development practices using React Native (Expo), Node.js (Express), and MongoDB.

## Key Features

- **Multi-Platform Content Sharing**
  - Support for text, images, and video content
  - Social interactions: likes, comments, shares, bookmarks, and downloads

- **Advanced Authentication System**
  - Email/username & password login
  - Social authentication via Google (using Expo AuthSession)
  - Phone number verification

- **Real-Time Communication**
  - Direct messaging with Socket.IO
  - Chat rooms and conversation management
  - Live chat/streaming capabilities (TikTok Live concept)

- **User Engagement Tools**
  - Push notifications through Expo Notifications
  - User profiles with customizable details
  - Community and discussion forum support
  - Follow/unfollow functionality

## Project Architecture

```
SoroApp/
├── backend/               # Node.js/Express API with MongoDB
│   ├── controllers/       # Route handlers for auth, posts, chats, etc.
│   ├── middleware/        # Custom middleware (e.g., authentication)
│   ├── models/            # Mongoose schemas for User, Post, Chat
│   ├── routes/            # API endpoints for auth, posts, chats
│   └── index.js           # Server entry point with Socket.IO integration
└── mobile/                # Expo React Native project
    ├── App.js             # Main entry point
    ├── contexts/          # React Context for authentication and global state
    ├── navigation/        # Navigation configuration
    └── screens/           # Screen components
```

## Installation

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/soro-app.git
   cd soro-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Start the server**
   ```bash
   node index.js
   ```

### Mobile Setup

1. **Navigate to the mobile directory**
   ```bash
   cd ../mobile
   ```

2. **Install dependencies**
   ```bash
   npx create-expo-app@latest .
   expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage expo-notifications expo-device
   npm install axios socket.io-client
   ```

3. **Launch the app**
   ```bash
   npx expo start
   ```

## Authentication Flow

Soro implements a comprehensive authentication system:

- **Traditional Login**: Email/password authentication with secure JWT token handling
- **Social Authentication**: Google login integration via Expo AuthSession
- **Phone Verification**: Simulated SMS verification flow

Authentication state is managed through React Context (`AuthContext`) and persisted with AsyncStorage.

## Real-Time Messaging

The messaging system provides:

- **Chat List**: Overview of all active conversations
- **Chat Room**: Real-time messaging interface with Socket.IO
- **Notification Integration**: Alert users of new messages even when the app is in the background

## Push Notifications

Integrated with Expo's Notifications API to:

- Request permissions and generate device tokens
- Handle incoming notifications
- Process user interactions with notifications

## Development Roadmap

- **Enhanced Security**: Implement additional authentication safeguards
- **Live Streaming**: Complete TikTok-style live streaming functionality
- **User Experience**: Add custom animations and transitions
- **Production Integration**: Replace simulated services with production-ready third-party solutions

## Educational Purpose

This project was developed as a teaching tool to demonstrate:

- Full-stack mobile application architecture
- Modern authentication techniques
- Real-time communication implementation
- Integration of native device features

## License

This project is available for educational purposes. Feel free to extend and modify it for your own learning.

## Acknowledgments

Special thanks to all contributors and the open-source community whose tools and libraries made this project possible.