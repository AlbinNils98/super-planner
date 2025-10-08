import HeaderBackButton from '@/components/HeaderBackButton';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/Auth';
import { Redirect, Stack, useRouter } from 'expo-router';


const ProtectedLayout = () => {
  const { token, isReady } = useAuth();
  const router = useRouter();

  if (!isReady) {
    return null;
  }

  if (!token) {
    return <Redirect href='/(auth)' />;
  }

  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.background
      },
      title: '',
      headerLeft: () => { if (router.canGoBack()) return <HeaderBackButton /> },
    }} />
}

export default ProtectedLayout;