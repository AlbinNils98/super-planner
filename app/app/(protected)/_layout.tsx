import { useAuth } from '@/context/Auth';
import { Redirect, Stack } from 'expo-router';


const ProtectedLayout = () => {
  const { token, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!token) {
    return <Redirect href='/(auth)' />;
  }

  return <Stack screenOptions={{ headerShown: false }} />
}

export default ProtectedLayout;