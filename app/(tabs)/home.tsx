import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Image, FlatList } from "react-native";
import { router } from "expo-router";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  searchBar: ViewStyle;
  searchInput: TextStyle;
  storiesContainer: ViewStyle;
  storyItem: ViewStyle;
  storyImage: ViewStyle;
  storyText: TextStyle;
  postsContainer: ViewStyle;
  post: ViewStyle;
  postHeader: ViewStyle;
  postAuthor: ViewStyle;
  authorAvatar: ViewStyle;
  authorName: TextStyle;
  postContent: TextStyle;
  postImage: ViewStyle;
  postActions: ViewStyle;
  actionButton: ViewStyle;
  actionText: TextStyle;
}

export default function HomeScreen(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "John Doe",
        avatar: "https://example.com/avatar1.jpg",
      },
      content: "Just had an amazing day at the beach! 🌊",
      image: "https://example.com/beach.jpg",
      likes: 42,
      comments: 5,
      timestamp: "2h ago",
    },
    // Add more mock posts as needed
  ]);

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.postAuthor}>
          <View style={styles.authorAvatar}>
            <Text style={styles.authorInitial}>
              {item.author.name.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={styles.authorName}>{item.author.name}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.postContent}>{item.content}</Text>

      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>❤️ {item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 {item.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>🔄 Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchInput}>Search posts...</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesContainer}
      >
        {/* Add story items here */}
      </ScrollView>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.postsContainer}
      />
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
  storiesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  storyItem: {
    marginRight: 16,
    alignItems: "center",
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e1e1e1",
    marginBottom: 4,
  },
  storyText: {
    fontSize: 12,
    color: "#666",
  },
  postsContainer: {
    flex: 1,
  },
  post: {
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 16,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  postAuthor: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  authorInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  authorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  postContent: {
    fontSize: 16,
    marginBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    color: "#666",
  },
}); 