import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ViewStyle, TextStyle } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/contexts/AuthContext";
import { router } from "expo-router";

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  input: ViewStyle;
  link: TextStyle;
}

export default function RegisterScreen(): JSX.Element {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://YOUR_BACKEND_SERVER/api/auth/register",
        { email, password, username }
      );
      await AsyncStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Registration Failed", "Please try again with different credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Text
        style={styles.link}
        onPress={() => router.push("/auth/login")}
      >
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 16 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20 
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  link: { 
    marginTop: 15, 
    color: "blue" 
  },
}); 