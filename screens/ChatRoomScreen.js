// mobile/screens/ChatRoomScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import io from "socket.io-client";

const ChatRoomScreen = ({ route }) => {
  const { chatId, chatName } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // Using a ref to persist the socket instance throughout the component's lifetime.
  const socketRef = useRef();

  useEffect(() => {
    // Establish connection with the Socket.IO backend
    socketRef.current = io("http://YOUR_BACKEND_SERVER", {
      query: { chatId },
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to chat room:", chatId);
    });

    // Listen for incoming messages from the server.
    socketRef.current.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [chatId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const msgObject = {
        chatId,
        text: message,
        sender: "currentUser", // Replace with the logged-in user's identifier
        createdAt: new Date(),
      };

      // Emit the message event to the backend
      socketRef.current.emit("message", msgObject);

      // Optionally, add the message to local state immediately for a responsive UI.
      setMessages((prevMessages) => [...prevMessages, msgObject]);
      setMessage("");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.messageBubble}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.chatTitle}>{chatName}</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  chatTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  messageBubble: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  sender: { fontWeight: "bold" },
  messageText: { marginTop: 2 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 5,
  },
});

export default ChatRoomScreen;
