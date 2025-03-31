// mobile/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Optionally, load user data from AsyncStorage if a token exists
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        // If a token exists, you might want to decode it or request user details from your backend
        if (token) {
          // For simplicity, we simply assume the token means a user is logged in.
          // In a real app, consider fetching user details here.
          setUser({ token });
        }
      } catch (error) {
        console.error("Error loading token:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
