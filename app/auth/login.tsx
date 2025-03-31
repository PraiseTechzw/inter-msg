import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ViewStyle, TextStyle } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ENDPOINTS } from "../config/api";

interface Styles {
  container: ViewStyle;
  logoContainer: ViewStyle;
  logo: ViewStyle;
  logoInner: ViewStyle;
  logoIcon: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  inputIcon: ViewStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  link: TextStyle;
  testButton: ViewStyle;
}

export default function LoginScreen(): JSX.Element {
  const { setUser } = useAuth();
  const [email, setEmail] = useState<string>("test@example.com");
  const [password, setPassword] = useState<string>("password123");
  const [loading, setLoading] = useState<boolean>(false);

  const checkNetworkConnection = async () => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection and try again."
      );
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const isConnected = await checkNetworkConnection();
    if (!isConnected) return;

    setLoading(true);
    try {
      console.log('Attempting login to:', ENDPOINTS.AUTH.LOGIN);
      const response = await axios.post(ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      }, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        router.replace("/(tabs)");
      } else {
        Alert.alert("Error", "Invalid response from server");
      }
    } catch (error: any) {
      console.error("Login error details:", {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
        }
      });
      
      if (error.code === 'ECONNABORTED') {
        Alert.alert("Timeout", "Request took too long. Please try again.");
      } else if (!error.response) {
        Alert.alert(
          "Connection Error",
          `Could not connect to the server at ${ENDPOINTS.AUTH.LOGIN}. Please check if the server is running and try again.`
        );
      } else {
        const message = error.response?.data?.message || "Please check your credentials and try again.";
        Alert.alert("Login Failed", message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <View style={styles.logoInner}>
            <View style={styles.logoIcon}>
              <Ionicons name="chatbubbles" size={32} color="#fff" />
            </View>
            <View style={[styles.logoIcon, { transform: [{ rotate: '15deg' }] }]}>
              <Ionicons name="people" size={32} color="#fff" />
            </View>
          </View>
        </View>
        <Text style={styles.title}>Inter-msg</Text>
        <Text style={styles.subtitle}>Connect with your community</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <Ionicons name="mail-outline" size={20} color="#666" />
        </View>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputIcon}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" />
        </View>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Signing in..." : "Sign In"}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.testButton]} 
        onPress={() => {
          setEmail("test@example.com");
          setPassword("password123");
          handleLogin();
        }}
      >
        <Text style={styles.buttonText}>Test Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: {
    marginHorizontal: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#007AFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  testButton: {
    backgroundColor: "#4CAF50",
    marginTop: 8,
  },
}); 