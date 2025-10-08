import HeaderBackButton from '@/components/HeaderBackButton';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/Auth';
import { Redirect, Stack, useRouter } from 'expo-router'

const AuthLayout = () => {
  const router = useRouter();
  const { token, isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  if (token) {
    return <Redirect href='/(protected)' />;
  }
  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.background
      },
      title: '',
      headerLeft: () => { if (router.canGoBack()) return <HeaderBackButton /> }
    }} />
}

export default AuthLayout;