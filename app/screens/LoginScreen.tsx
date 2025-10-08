import { Button } from '@/common/Button';
import { TextInput } from '@/common/TextInput';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { useAuth } from '@/context/Auth';
import { SignInMutation, SignInMutationVariables } from '@/generated/graphql';
import { SIGN_IN_MUTATION } from '@/graphql/mutation/auth';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LoginScreen = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [loginMutation] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN_MUTATION, {
    onCompleted: async (data) => {
      setErrorMessage(null)
      await login(data.signIn);
    },
    onError: (error) => setErrorMessage(error.message || "Login failed"),
  });

  const handleLogin = async () => {
    loginMutation({ variables: { username, password } });
  }

  return (
    <SafeAreaWrapper>
      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>
        <TextInput placeholder='Username' value={username} onChangeText={setUsername} />
        <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
        <Button title='Login' onPress={handleLogin} />
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      </View>
    </SafeAreaWrapper>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: 10,
  },
});

export default LoginScreen;