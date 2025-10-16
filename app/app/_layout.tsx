import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client/react";
import client from '@/apollo/client';
import { AuthProvider } from '@/context/Auth';
import Toast from '@/common/Toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <GestureHandlerRootView>
          <Stack >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          </Stack>
          <Toast />
        </GestureHandlerRootView>
      </AuthProvider>
    </ApolloProvider>
  );
}
