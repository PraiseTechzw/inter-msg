import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  divider: ViewStyle;
  dividerText: TextStyle;
}

export default function SocialLoginScreen(): JSX.Element {
  const { setUser } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      // Implement Google login logic here
      // For now, we'll just navigate to the main app
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      // Implement Facebook login logic here
      // For now, we'll just navigate to the main app
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Social Media</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleFacebookLogin}>
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <Text style={styles.dividerText}>or</Text>
      </View>

      <TouchableOpacity onPress={() => router.push("/auth/login")}>
        <Text style={styles.buttonText}>Login with Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
  },
  button: {
    width: "100%",
    padding: 16,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerText: {
    flex: 1,
    textAlign: "center",
    color: "#666",
  },
}); 