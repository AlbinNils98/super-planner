import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import * as SecureStore from "expo-secure-store";
import { SetContextLink } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: `${process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080'}/graphql`,
});

const authLink = new SetContextLink(async ({ headers }) => {

  const token = await SecureStore.getItemAsync("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;