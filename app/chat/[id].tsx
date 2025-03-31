import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Image, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  isRead: boolean;
}

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  headerSubtitle: TextStyle;
  messagesContainer: ViewStyle;
  messageBubble: ViewStyle;
  sentMessage: ViewStyle;
  receivedMessage: ViewStyle;
  messageText: TextStyle;
  messageTime: TextStyle;
  inputContainer: ViewStyle;
  input: TextStyle;
  sendButton: ViewStyle;
  sendButtonText: TextStyle;
  avatar: ViewStyle;
  avatarText: TextStyle;
  readStatus: TextStyle;
}

export default function ChatRoomScreen(): JSX.Element {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey, how are you?",
      sender: {
        id: "1",
        name: "John Doe",
        avatar: "https://example.com/avatar1.jpg",
      },
      timestamp: "2:30 PM",
      isRead: true,
    },
    {
      id: "2",
      text: "I'm doing great! How about you?",
      sender: {
        id: "currentUser",
        name: "Me",
        avatar: "https://example.com/my-avatar.jpg",
      },
      timestamp: "2:31 PM",
      isRead: true,
    },
    // Add more mock messages as needed
  ]);
  const [newMessage, setNewMessage] = useState<string>("");
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: {
        id: "currentUser",
        name: "Me",
        avatar: "https://example.com/my-avatar.jpg",
      },
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isRead: false,
    };

    setMessages([...messages, message]);
    setNewMessage("");
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.sender.id === "currentUser";

    return (
      <View style={[styles.messageBubble, isCurrentUser ? styles.sentMessage : styles.receivedMessage]}>
        {!isCurrentUser && (
          <View style={styles.avatar}>
            {item.sender.avatar ? (
              <Image source={{ uri: item.sender.avatar }} style={styles.avatar} />
            ) : (
              <Text style={styles.avatarText}>{item.sender.name.charAt(0)}</Text>
            )}
          </View>
        )}
        <View>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.messageTime}>{item.timestamp}</Text>
          {isCurrentUser && item.isRead && (
            <Text style={styles.readStatus}>Read</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>John Doe</Text>
          <Text style={styles.headerSubtitle}>Online</Text>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    flexDirection: "row",
    marginBottom: 16,
    maxWidth: "80%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },
  receivedMessage: {
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  avatarText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  readStatus: {
    fontSize: 12,
    color: "#007AFF",
    marginTop: 4,
    alignSelf: "flex-end",
  },
}); 