import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

interface Styles {
  container: ViewStyle;
  chatItem: ViewStyle;
  chatName: TextStyle;
  lastMessage: TextStyle;
  timestamp: TextStyle;
  unreadBadge: ViewStyle;
  unreadText: TextStyle;
}

export default function ChatListScreen(): JSX.Element {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get("http://YOUR_BACKEND_SERVER/api/chats", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => router.push(`/chat/${item.id}`)}
    >
      <View>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
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
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  unreadBadge: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
}); 