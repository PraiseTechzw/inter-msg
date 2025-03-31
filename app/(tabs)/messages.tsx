import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Image, FlatList } from "react-native";
import { router } from "expo-router";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  searchBar: ViewStyle;
  searchInput: TextStyle;
  messagesContainer: ViewStyle;
  messageItem: ViewStyle;
  avatarContainer: ViewStyle;
  avatar: ViewStyle;
  onlineBadge: ViewStyle;
  messageContent: ViewStyle;
  messageHeader: ViewStyle;
  senderName: TextStyle;
  timestamp: TextStyle;
  lastMessage: TextStyle;
  unreadBadge: ViewStyle;
  unreadText: TextStyle;
  newChatButton: ViewStyle;
  newChatText: TextStyle;
}

export default function MessagesScreen(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: {
        id: "1",
        name: "John Doe",
        avatar: "https://example.com/avatar1.jpg",
      },
      lastMessage: "Hey, how are you?",
      timestamp: "2m ago",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      sender: {
        id: "2",
        name: "Jane Smith",
        avatar: "https://example.com/avatar2.jpg",
      },
      lastMessage: "See you tomorrow!",
      timestamp: "1h ago",
      unreadCount: 0,
      isOnline: false,
    },
    // Add more mock messages as needed
  ]);

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => router.push(`/chat/${item.sender.id}`)}
    >
      <View style={styles.avatarContainer}>
        {item.sender.avatar ? (
          <Image
            source={{ uri: item.sender.avatar }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.sender.name.charAt(0)}
            </Text>
          </View>
        )}
        {item.isOnline && <View style={styles.onlineBadge} />}
      </View>

      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.sender.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchInput}>Search messages...</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.messagesContainer}
      />

      <TouchableOpacity
        style={styles.newChatButton}
        onPress={() => router.push("/chat/new")}
      >
        <Text style={styles.newChatText}>New Chat</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  headerTitle: {
    fontSize: 24,
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
    color: "#666",
    fontSize: 16,
  },
  messagesContainer: {
    flex: 1,
  },
  messageItem: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  onlineBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4cd964",
    borderWidth: 2,
    borderColor: "#fff",
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
  },
  unreadBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  newChatButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  newChatText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
}); 