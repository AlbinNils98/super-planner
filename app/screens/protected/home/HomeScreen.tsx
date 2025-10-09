import { Button } from '@/common/Button';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { useAuth } from '@/context/Auth';
import { MeQuery } from '@/generated/graphql';
import { GET_ME_QUERY } from '@/graphql/query/user';
import { useQuery } from '@apollo/client/react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import TodoBox from './components/TodoBox';
import Box from '@/components/Box';
import CalendarBox from './components/CalendarBox';
import RoutineBox from './components/RoutineBox';
import JournalBox from './components/JournalBox';


const HomeScreen = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  }

  const { data: user } = useQuery<MeQuery>(GET_ME_QUERY);

  return (
    <SafeAreaWrapper>
      <ScrollView>
        <Box style={styles.userBox}>
          <Text style={{ textAlign: 'center' }}>{`Welcome,\n${user?.me?.username}!`}</Text>
        </Box>

        <TodoBox />
        <CalendarBox />
        <RoutineBox />
        <JournalBox />
        <Button title="Log out" onPress={handleLogout} />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  userBox: {
    height: 200,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen;