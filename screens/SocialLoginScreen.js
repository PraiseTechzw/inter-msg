// mobile/screens/SocialLoginScreen.js
import React, { useEffect, useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function SocialLoginScreen() {
  const { setUser } = useContext(AuthContext);

  // Replace these with your actual OAuth client IDs
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken);
    }
  }, [response]);

  const fetchUserInfo = async (accessToken) => {
    try {
      // Fetch basic profile info from Google
      const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Google user info:", res.data);
      // Optionally, you can now call your backend social-login endpoint
      // to create or log in the user in your system.
      await AsyncStorage.setItem("token", accessToken);
      setUser({ ...res.data, token: accessToken });
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      Alert.alert("Login Error", "Could not fetch user information.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Login</Text>
      <Button
        title="Login with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
