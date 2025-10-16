import { Button } from '@/common/Button';
import ScreenTitle from '@/common/ScreenTitle';
import { TextInput } from '@/common/TextInput';
import { SafeAreaWrapper } from '@/components/SafeAreaWrapper';
import { SignUpMutation, SignUpMutationVariables } from '@/generated/graphql';
import { SIGN_UP_MUTATION } from '@/graphql/mutation/auth';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

const RegisterScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signUpMutation] = useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP_MUTATION, {
    onError: (error) => Toast.show({ type: 'error', text1: error.message || "Registration failed" }),
    onCompleted: (data) => {
      Toast.show({ type: 'success', text1: "Registration successful!" });
      router.replace("/login");
    }
  });

  const handleRegister = async () => {
    signUpMutation({ variables: { username, email, password } });
  }

  const handleGoToLogin = () => {
    router.replace("/login");
  }

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
          <ScreenTitle title="Register" />
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <TextInput placeholder='Username' value={username} onChangeText={setUsername} />
              <TextInput placeholder='Email' value={email} onChangeText={setEmail} keyboardType="email-address" />
              <TextInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry />
              <View style={styles.loginContainer}>
                <Text>Already have an account?</Text>
                <Pressable style={styles.loginPressable} onPress={handleGoToLogin}>
                  <Text style={styles.loginText}>Login here!</Text>
                </Pressable>
              </View>
            </View>
            <Button title='Register' onPress={handleRegister} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
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
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  loginPressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
  }
});

export default RegisterScreen;