import { Button } from '@/common/Button';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { useAuth } from '@/context/Auth';
import { MeQuery } from '@/generated/graphql';
import { GET_ME_QUERY } from '@/graphql/query/user';
import { useQuery } from '@apollo/client/react';
import { Text } from 'react-native';


const HomeScreen = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  const { data: user } = useQuery<MeQuery>(GET_ME_QUERY);


  return (
    <SafeAreaWrapper>
      <Text>Home Screen</Text>
      <Text>Welcome, {user?.me?.username}</Text>
      <Button title="Log out" onPress={handleLogout} />
    </SafeAreaWrapper>
  );
}

export default HomeScreen;