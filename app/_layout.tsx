import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { View, ActivityIndicator } from 'react-native';

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      {!user ? (
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
