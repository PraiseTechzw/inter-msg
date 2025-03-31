// mobile/App.js
import React, { useState, useEffect, useRef, useContext } from "react";
import { Platform, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import MainTabNavigator from "./navigation/MainTabNavigator";
import AuthStackNavigator from "./navigation/AuthStackNavigator";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Function to register for push notifications and return the token.
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    // Get existing permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    // Ask for permission if not granted
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    // If permission is still not granted, alert the user.
    if (finalStatus !== "granted") {
      Alert.alert("Permission required", "Failed to get push token for notifications!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo push token:", token);
    // Here, send the token to your backend to update the user's record.
  } else {
    Alert.alert("Physical device required", "Push notifications only work on physical devices.");
  }

  // Configure Android-specific notification channel.
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

// RootNavigation component to switch between Auth flow and the Main app.
const RootNavigation = () => {
  const { user } = useContext(AuthContext);
  return user ? <MainTabNavigator /> : <AuthStackNavigator />;
};

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Register for push notifications and obtain the token.
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Listener fired when a notification is received while the app is foregrounded.
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification Received:", notification);
    });

    // Listener fired when a user interacts with a notification (taps on it).
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification Response:", response);
    });

    // Clean up the notification listeners on unmount.
    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}

