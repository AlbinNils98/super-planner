import { Colors } from '@/constants/Colors'
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

type ScreenTitleProps = {
  title: string,
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title, style, textStyle }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 55,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.light.text.primary,
    fontFamily: "Roboto",
  },
})

export default ScreenTitle