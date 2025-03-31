import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  timer: TextStyle;
  resendButton: ViewStyle;
  resendText: TextStyle;
}

export default function PhoneVerificationScreen(): JSX.Element {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const { setUser } = useAuth();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft > 0 && !canResend) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const handleVerify = async () => {
    if (!verificationCode.trim()) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    try {
      // Here you would typically verify the code with your backend
      // For now, we'll just navigate to the main app
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Verification error:", error);
      Alert.alert("Error", "Invalid verification code. Please try again.");
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    try {
      // Here you would typically make an API call to resend the code
      setTimeLeft(60);
      setCanResend(false);
      Alert.alert("Success", "Verification code resent successfully");
    } catch (error) {
      console.error("Error resending code:", error);
      Alert.alert("Error", "Failed to resend verification code. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Phone Number</Text>
      <Text style={styles.description}>
        Enter the verification code sent to {phoneNumber}
      </Text>

      <TextInput
        style={styles.input}
        value={verificationCode}
        onChangeText={setVerificationCode}
        placeholder="Enter verification code"
        keyboardType="number-pad"
        maxLength={6}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        {!canResend ? (
          <Text style={styles.timer}>Resend code in {timeLeft}s</Text>
        ) : (
          <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>
        )}
      </View>
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
    textAlign: "center",
    letterSpacing: 8,
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
  resendContainer: {
    marginTop: 16,
  },
  timer: {
    color: "#666",
    fontSize: 14,
  },
  resendButton: {
    padding: 8,
  },
  resendText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "bold",
  },
}); 