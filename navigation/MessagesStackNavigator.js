// mobile/navigation/MessagesStackNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatListScreen from "../screens/ChatListScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";

const Stack = createStackNavigator();

const MessagesStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Chats"
      component={ChatListScreen}
      options={{ headerTitle: "Messages" }}
    />
    <Stack.Screen
      name="ChatRoom"
      component={ChatRoomScreen}
      options={({ route }) => ({ title: route.params.chatName })}
    />
  </Stack.Navigator>
);

export default MessagesStackNavigator;
