import { Button } from '@/common/Button';
import ScreenTitle from '@/common/ScreenTitle';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaWrapper>
      <ScreenTitle title={"Welcome to\nSuper Planner!"} />
      <View style={styles.buttonBox}>
        <Button title="Login" onPress={() => { router.push("/login") }} />
        <Button title="Register" onPress={() => { router.push("/register") }} />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonBox: {
    width: '100%',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default WelcomeScreen;