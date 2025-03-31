import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
}

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  avatar: ViewStyle;
  avatarImage: ViewStyle;
  name: TextStyle;
  email: TextStyle;
  section: ViewStyle;
  sectionTitle: TextStyle;
  menuItem: ViewStyle;
  menuItemText: TextStyle;
  menuItemIcon: TextStyle;
  divider: ViewStyle;
}

export default function ProfileScreen(): JSX.Element {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || "User Name",
    email: user?.email || "user@example.com",
    phoneNumber: user?.phoneNumber || "+1234567890",
    avatar: user?.avatar,
  });

  const handleLogout = async () => {
    try {
      // Here you would typically make an API call to logout
      setUser(null);
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          {profile.avatar ? (
            <Image source={{ uri: profile.avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarImage}>
              <Text style={styles.avatarText}>
                {profile.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Edit Profile</Text>
          <Text style={styles.menuItemIcon}>→</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Change Password</Text>
          <Text style={styles.menuItemIcon}>→</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Notifications</Text>
          <Text style={styles.menuItemIcon}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Help Center</Text>
          <Text style={styles.menuItemIcon}>→</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Contact Us</Text>
          <Text style={styles.menuItemIcon}>→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e1e1e1",
    marginBottom: 16,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 16,
  },
  menuItemIcon: {
    fontSize: 16,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#e1e1e1",
    marginVertical: 8,
  },
  logoutButton: {
    margin: 16,
    padding: 16,
    backgroundColor: "#ff3b30",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
}); 