// mobile/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Replace with your backend API endpoint:
    axios.get("http://YOUR_BACKEND_SERVER/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      {item.mediaUrl && <Image source={{ uri: item.mediaUrl }} style={styles.postImage} />}
      <Text style={styles.caption}>{item.content}</Text>
      {/* Action buttons for like, comment, share, bookmark */}
      <View style={styles.actions}>
        <TouchableOpacity><Text>Like</Text></TouchableOpacity>
        <TouchableOpacity><Text>Comment</Text></TouchableOpacity>
        <TouchableOpacity><Text>Share</Text></TouchableOpacity>
        <TouchableOpacity><Text>Bookmark</Text></TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  postCard: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    padding: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  caption: {
    marginVertical: 8,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
