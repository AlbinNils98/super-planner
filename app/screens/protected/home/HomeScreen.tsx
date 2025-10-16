import { Button } from '@/common/Button';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { useAuth } from '@/context/Auth';
import { ScrollView, StyleSheet, Text } from 'react-native';
import TodoBox from './components/TodoBox';
import Box from '@/components/Box';
import CalendarBox from './components/CalendarBox';
import RoutineBox from './components/RoutineBox';
import JournalBox from './components/JournalBox';


const HomeScreen = () => {
  const { logout, user } = useAuth();

  return (
    <SafeAreaWrapper style={{ paddingHorizontal: 0 }}>
      <ScrollView style={styles.scrollView}>
        <Box style={styles.userBox}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>{`Welcome, ${user?.me?.username}!`}</Text>
        </Box>

        <TodoBox />
        <CalendarBox />
        <RoutineBox />
        <JournalBox />
        <Button title="Log out" onPress={logout} />
      </ScrollView>
    </SafeAreaWrapper>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 16
  },
  userBox: {
    height: 200,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen;