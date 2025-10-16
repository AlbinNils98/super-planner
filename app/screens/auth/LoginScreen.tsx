import { Button } from '@/common/Button';
import ScreenTitle from '@/common/ScreenTitle';
import { TextInput } from '@/common/TextInput';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { useAuth } from '@/context/Auth';
import { SignInMutation, SignInMutationVariables } from '@/generated/graphql';
import { SIGN_IN_MUTATION } from '@/graphql/mutation/auth';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginMutation] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN_MUTATION, {
    onCompleted: async (data) => {
      await login(data.signIn);
    },
    onError: (error) => Toast.show({ type: 'error', text1: error.message || "Login failed" })
  });

  const handleLogin = async () => {
    loginMutation({ variables: { username, password } });
  }

  const handleGoToRegister = () => {
    router.replace("/register");
  }

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <ScreenTitle title="Login" />
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput placeholder='Username' value={username} onChangeText={setUsername} />
              <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
              <View style={styles.registerContainer}>
                <Text>Dont have an account yet?</Text>
                <Pressable style={styles.registerPressable} onPress={handleGoToRegister}>
                  <Text style={styles.registerText}>Register here!</Text>
                </Pressable>
              </View>
            </View>
            <Button title='Login' onPress={handleLogin} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  )
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '100%',
    gap: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  registerPressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
  }
});

export default LoginScreen;