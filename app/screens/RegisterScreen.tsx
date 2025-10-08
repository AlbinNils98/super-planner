import { Button } from '@/common/Button';
import { TextInput } from '@/common/TextInput';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { SignUpMutation, SignUpMutationVariables } from '@/generated/graphql';
import { SIGN_UP_MUTATION } from '@/graphql/mutation/auth';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RegisterScreen = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signUpMutation] = useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP_MUTATION, {
    onError: (error) => setErrorMessage(error.message || "Registration failed"),
    onCompleted: (data) => {
      setErrorMessage(null);
      router.replace("/login");
    }
  });

  const handleRegister = async () => {
    signUpMutation({ variables: { username, email, password } });
  }

  return (
    <SafeAreaWrapper>
      <Text style={styles.title}>Register</Text>
      <View style={styles.form}>
        <TextInput placeholder='Username' value={username} onChangeText={setUsername} />
        <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
        <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
        <Button title='Register' onPress={handleRegister} />
        {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      </View>
    </SafeAreaWrapper>
  );
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

export default RegisterScreen;