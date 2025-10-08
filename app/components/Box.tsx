import { Colors } from '@/constants/Colors'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

type BoxProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Box: React.FC<BoxProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.light.text.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
});

export default Box;