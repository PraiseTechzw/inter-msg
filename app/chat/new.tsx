import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, FlatList } from "react-native";
import { router } from "expo-router";

interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  searchBar: ViewStyle;
  searchInput: TextStyle;
  usersContainer: ViewStyle;
  userItem: ViewStyle;
  userInfo: ViewStyle;
  userAvatar: ViewStyle;
  avatarText: TextStyle;
  userName: TextStyle;
  username: TextStyle;
  startChatButton: ViewStyle;
  startChatText: TextStyle;
}

export default function NewChatScreen(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      username: "@johndoe",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      username: "@janesmith",
      avatar: "https://example.com/avatar2.jpg",
    },
    // Add more mock users as needed
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartChat = () => {
    if (selectedUser) {
      router.push(`/chat/${selectedUser.id}`);
    }
  };

  const renderUser = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={[
        styles.userItem,
        selectedUser?.id === item.id && styles.selectedUser,
      ]}
      onPress={() => setSelectedUser(item)}
    >
      <View style={styles.userInfo}>
        <View style={styles.userAvatar}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
          ) : (
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          )}
        </View>
        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.username}>{item.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Chat</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search users..."
        />
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.usersContainer}
      />

      {selectedUser && (
        <TouchableOpacity
          style={styles.startChatButton}
          onPress={handleStartChat}
        >
          <Text style={styles.startChatText}>
            Start Chat with {selectedUser.name}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBar: {
    margin: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    fontSize: 16,
  },
  usersContainer: {
    flex: 1,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  selectedUser: {
    backgroundColor: "#f0f8ff",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  username: {
    fontSize: 14,
    color: "#666",
  },
  startChatButton: {
    margin: 16,
    padding: 16,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  startChatText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
}); 