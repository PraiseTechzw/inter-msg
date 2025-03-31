import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
}

interface Styles {
  container: ViewStyle;
  messageList: ViewStyle;
  messageContainer: ViewStyle;
  messageText: TextStyle;
  timestamp: TextStyle;
  inputContainer: ViewStyle;
  input: ViewStyle;
  sendButton: ViewStyle;
  sendButtonText: TextStyle;
}

export default function ChatRoomScreen(): JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    fetchMessages();
    setupSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [id]);

  const setupSocket = async () => {
    const token = await AsyncStorage.getItem("token");
    socketRef.current = io("http://YOUR_BACKEND_SERVER", {
      auth: { token },
    });

    socketRef.current.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      flatListRef.current?.scrollToEnd();
    });
  };

  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`http://YOUR_BACKEND_SERVER/api/chats/${id}/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `http://YOUR_BACKEND_SERVER/api/chats/${id}/messages`,
        { text: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    maxHeight: 100,
  },
  sendButton: {
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#007AFF",
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
}); 