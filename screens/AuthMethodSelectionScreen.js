// mobile/screens/AuthMethodSelectionScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const AuthMethodSelectionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Login Method</Text>
      <Button title="Login with Email" onPress={() => navigation.navigate("Login")} />
      <Button title="Login with Phone" onPress={() => navigation.navigate("PhoneNumberInput")} />
      <Button title="Login with Google" onPress={() => navigation.navigate("SocialLogin")} />
      <Button title="Register" onPress={() => navigation.navigate("Register")} />
    </View>
  );
};

export default AuthMethodSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 24, marginBottom: 20 },
});
