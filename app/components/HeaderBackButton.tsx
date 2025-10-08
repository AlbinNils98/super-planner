import { Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const HeaderBackButton = () => {
  const router = useRouter();

  const handlePress = () => {
    if (router.canGoBack()) {
      router.back();
    }
  }

  return (
    <Pressable onPress={handlePress} hitSlop={25} style={{ marginLeft: -10 }}>
      <Entypo name="chevron-left" size={40} color="#000000" />
    </Pressable>
  )
};

export default HeaderBackButton;
