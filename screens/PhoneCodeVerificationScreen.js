// mobile/screens/PhoneCodeVerificationScreen.js
import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

const PhoneCodeVerificationScreen = ({ route }) => {
  const { phone } = route.params;
  const { setUser } = useContext(AuthContext);
  const [code, setCode] = useState("");

  const handleVerifyCode = async () => {
    try {
      // Call your backend endpoint to verify the code.
      const response = await axios.post("http://YOUR_BACKEND_SERVER/api/auth/verify-code", { phone, code });
      if (response.data.success) {
        const { token, user } = response.data;
        await AsyncStorage.setItem("token", token);
        setUser(user);
      } else {
        Alert.alert("Verification Failed", "The code you entered is incorrect.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred during verification.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Phone</Text>
      <Text>We sent a verification code to {phone}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Verification Code"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Verify Code" onPress={handleVerifyCode} />
    </View>
  );
};

export default PhoneCodeVerificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
});
