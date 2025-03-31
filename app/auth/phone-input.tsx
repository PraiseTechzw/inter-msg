import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert } from "react-native";
import { router } from "expo-router";

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  description: TextStyle;
}

export default function PhoneNumberInputScreen(): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    try {
      // Here you would typically make an API call to send the verification code
      // For now, we'll just navigate to the verification screen
      router.push({
        pathname: "/auth/phone-verify",
        params: { phoneNumber }
      });
    } catch (error) {
      console.error("Error sending verification code:", error);
      Alert.alert("Error", "Failed to send verification code. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone Number</Text>
      <Text style={styles.description}>
        We'll send you a verification code to confirm your phone number
      </Text>

      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        autoComplete="tel"
        maxLength={15}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
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
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 24,
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 16,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
}); 