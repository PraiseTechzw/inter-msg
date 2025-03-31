import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Image, FlatList } from "react-native";
import { router } from "expo-router";

interface LiveStream {
  id: string;
  title: string;
  host: {
    name: string;
    avatar: string;
  };
  viewers: number;
  thumbnail?: string;
  category: string;
  isLive: boolean;
  tags: string[];
}

interface Styles {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  searchBar: ViewStyle;
  searchInput: TextStyle;
  categoriesContainer: ViewStyle;
  categoryItem: ViewStyle;
  categoryText: TextStyle;
  selectedCategoryText: TextStyle;
  streamsContainer: ViewStyle;
  streamCard: ViewStyle;
  thumbnailContainer: ViewStyle;
  thumbnail: ViewStyle;
  liveBadge: ViewStyle;
  liveBadgeText: TextStyle;
  streamInfo: ViewStyle;
  streamTitle: TextStyle;
  hostInfo: ViewStyle;
  hostAvatar: ViewStyle;
  hostName: TextStyle;
  viewerCount: TextStyle;
  tagsContainer: ViewStyle;
  tag: ViewStyle;
  tagText: TextStyle;
}

export default function LiveScreen(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [streams, setStreams] = useState<LiveStream[]>([
    {
      id: "1",
      title: "Building a React Native App",
      host: {
        name: "John Doe",
        avatar: "https://example.com/avatar1.jpg",
      },
      viewers: 1234,
      thumbnail: "https://example.com/stream1.jpg",
      category: "Programming",
      isLive: true,
      tags: ["React Native", "TypeScript", "Mobile Development"],
    },
    {
      id: "2",
      title: "Photography Tips & Tricks",
      host: {
        name: "Jane Smith",
        avatar: "https://example.com/avatar2.jpg",
      },
      viewers: 856,
      thumbnail: "https://example.com/stream2.jpg",
      category: "Photography",
      isLive: true,
      tags: ["Photography", "Tips", "Tutorial"],
    },
    // Add more mock streams as needed
  ]);

  const categories = ["All", "Programming", "Photography", "Gaming", "Art", "Music"];

  const renderStream = ({ item }: { item: LiveStream }) => (
    <TouchableOpacity
      style={styles.streamCard}
      onPress={() => router.push(`/live/${item.id}`)}
    >
      <View style={styles.thumbnailContainer}>
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.thumbnail}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.thumbnail}>
            <Text style={styles.thumbnailText}>
              {item.title.charAt(0)}
            </Text>
          </View>
        )}
        {item.isLive && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        )}
      </View>

      <View style={styles.streamInfo}>
        <Text style={styles.streamTitle}>{item.title}</Text>
        
        <View style={styles.hostInfo}>
          <View style={styles.hostAvatar}>
            <Text style={styles.hostInitial}>
              {item.host.name.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={styles.hostName}>{item.host.name}</Text>
            <Text style={styles.viewerCount}>👥 {item.viewers}</Text>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Live Streams</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchInput}>Search streams...</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryItem}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={
                selectedCategory === category
                  ? styles.selectedCategoryText
                  : styles.categoryText
              }
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={streams}
        renderItem={renderStream}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.streamsContainer}
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
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  categoryText: {
    color: "#666",
    fontSize: 14,
  },
  selectedCategoryText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  streamsContainer: {
    flex: 1,
  },
  streamCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnailText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  liveBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#ff3b30",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  liveBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  streamInfo: {
    padding: 16,
  },
  streamTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  hostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  hostInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  hostName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewerCount: {
    fontSize: 12,
    color: "#666",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: "#666",
  },
}); 