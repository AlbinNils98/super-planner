import HeaderBackButton from '@/components/HeaderBackButton';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/Auth';
import { FontAwesome5 } from '@expo/vector-icons';
import { Redirect, Stack, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';


const ProtectedLayout = () => {
  const { token, isReady } = useAuth();
  const router = useRouter();

  if (!isReady) {
    return null;
  }

  if (!token) {
    return <Redirect href='/(auth)' />;
  }

  const handleSettingsPress = () => {

  }

  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.background
      },
      title: '',
      headerLeft: () => { if (router.canGoBack()) return <HeaderBackButton /> },
      headerRight: () => (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            hitSlop={25}
            onPress={handleSettingsPress}>
            <FontAwesome5 name="cog" size={40} color={Colors.light.primary} />
          </TouchableOpacity>
        </View>
      )
    }} />
}

export default ProtectedLayout;