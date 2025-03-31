// mobile/screens/PhoneNumberInputScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const PhoneNumberInputScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");

  const handleSendCode = async () => {
    try {
      // For demonstration, call your backend to send an OTP code.
      const response = await axios.post("http://YOUR_BACKEND_SERVER/api/auth/send-code", { phone });
      if (response.data.success) {
        navigation.navigate("PhoneCodeVerification", { phone });
      } else {
        Alert.alert("Error", "Failed to send code. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while sending the code.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Send Verification Code" onPress={handleSendCode} />
    </View>
  );
};

export default PhoneNumberInputScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
});
