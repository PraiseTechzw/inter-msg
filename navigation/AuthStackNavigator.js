// mobile/navigation/AuthStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthMethodSelectionScreen from "../screens/AuthMethodSelectionScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SocialLoginScreen from "../screens/SocialLoginScreen";
import PhoneNumberInputScreen from "../screens/PhoneNumberInputScreen";
import PhoneCodeVerificationScreen from "../screens/PhoneCodeVerificationScreen";

const Stack = createStackNavigator();

const AuthStackNavigator = () => (
  <Stack.Navigator initialRouteName="AuthSelection">
    <Stack.Screen name="AuthSelection" component={AuthMethodSelectionScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SocialLogin" component={SocialLoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PhoneNumberInput" component={PhoneNumberInputScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PhoneCodeVerification" component={PhoneCodeVerificationScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AuthStackNavigator;
