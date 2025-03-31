import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Image, FlatList } from "react-native";
import { router } from "expo-router";

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  image?: string;
  category: string;
  isJoined: boolean;
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
  communitiesContainer: ViewStyle;
  communityCard: ViewStyle;
  communityImage: ViewStyle;
  communityInfo: ViewStyle;
  communityName: TextStyle;
  communityDescription: TextStyle;
  communityMeta: ViewStyle;
  memberCount: TextStyle;
  category: TextStyle;
  joinButton: ViewStyle;
  joinButtonText: TextStyle;
  joinedButton: ViewStyle;
  joinedButtonText: TextStyle;
}

export default function CommunitiesScreen(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: "1",
      name: "Tech Enthusiasts",
      description: "A community for tech lovers to share and discuss the latest in technology.",
      memberCount: 1234,
      image: "https://example.com/tech.jpg",
      category: "Technology",
      isJoined: false,
    },
    {
      id: "2",
      name: "Photography Masters",
      description: "Share your photography skills and learn from others.",
      memberCount: 856,
      image: "https://example.com/photo.jpg",
      category: "Photography",
      isJoined: true,
    },
    // Add more mock communities as needed
  ]);

  const categories = ["All", "Technology", "Photography", "Gaming", "Art", "Music"];

  const handleJoinCommunity = (communityId: string) => {
    setCommunities(communities.map(community => 
      community.id === communityId 
        ? { ...community, isJoined: !community.isJoined }
        : community
    ));
  };

  const renderCommunity = ({ item }: { item: Community }) => (
    <View style={styles.communityCard}>
      <View style={styles.communityImage}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.communityImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.communityImage}>
            <Text style={styles.communityInitial}>
              {item.name.charAt(0)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.communityInfo}>
        <Text style={styles.communityName}>{item.name}</Text>
        <Text style={styles.communityDescription}>{item.description}</Text>
        
        <View style={styles.communityMeta}>
          <Text style={styles.memberCount}>👥 {item.memberCount}</Text>
          <Text style={styles.category}>#{item.category}</Text>
        </View>

        <TouchableOpacity
          style={item.isJoined ? styles.joinedButton : styles.joinButton}
          onPress={() => handleJoinCommunity(item.id)}
        >
          <Text style={item.isJoined ? styles.joinedButtonText : styles.joinButtonText}>
            {item.isJoined ? "Joined" : "Join"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Communities</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchInput}>Search communities...</Text>
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
        data={communities}
        renderItem={renderCommunity}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.communitiesContainer}
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
  communitiesContainer: {
    flex: 1,
  },
  communityCard: {
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
  communityImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#e1e1e1",
    justifyContent: "center",
    alignItems: "center",
  },
  communityInitial: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  communityInfo: {
    padding: 16,
  },
  communityName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  communityDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  communityMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  memberCount: {
    fontSize: 12,
    color: "#666",
  },
  category: {
    fontSize: 12,
    color: "#007AFF",
  },
  joinButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  joinedButton: {
    backgroundColor: "#e1e1e1",
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  joinedButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "bold",
  },
}); 