import { Button } from '@/common/Button';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Screen</Text>
        <View style={styles.buttonBox}>
          <Button title="Login" onPress={() => { router.push("/login") }} />
          <Button title="Register" onPress={() => { router.push("/register") }} />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonBox: {
    width: '100%',
    gap: 10,
  },
});

export default WelcomeScreen;