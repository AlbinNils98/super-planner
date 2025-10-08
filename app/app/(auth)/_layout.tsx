import { useAuth } from '@/context/Auth';
import { Redirect, Stack } from 'expo-router'

const AuthLayout = () => {
  const { token, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (token) {
    return <Redirect href='/(protected)' />;
  }
  return <Stack screenOptions={{ title: '' }} />
}

export default AuthLayout;