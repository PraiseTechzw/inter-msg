// mobile/screens/ChatListScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const ChatListScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetch the list of chats for the logged-in user.
    // Replace the URL with your backend endpoint.
    axios
      .get("http://YOUR_BACKEND_SERVER/api/chats")
      .then((response) => {
        setChats(response.data.chats);
      })
      .catch((error) => console.error("Error fetching chats:", error));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate("ChatRoom", {
          chatId: item._id,
          chatName: item.chatName,
        })
      }
    >
      <Text style={styles.chatTitle}>{item.chatName}</Text>
      <Text numberOfLines={1} style={styles.lastMessage}>
        {item.lastMessage || "No messages yet."}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  chatItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 12,
  },
  chatTitle: { fontSize: 18, fontWeight: "bold" },
  lastMessage: { color: "#666", marginTop: 4 },
});

export default ChatListScreen;
