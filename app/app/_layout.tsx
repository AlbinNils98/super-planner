import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client/react";
import client from '@/apollo/client';
import { AuthProvider } from '@/context/Auth';

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </ApolloProvider>
  );
}
