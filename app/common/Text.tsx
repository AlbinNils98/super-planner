import { Colors } from '@/constants/Colors';
import { Text as RNText, StyleSheet, TextProps } from "react-native";

const Text = (props: TextProps) => {
  return <RNText
    {...props}
    style={[styles.text, props.style]}
  />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto',
    color: Colors.light.text.primary
  },
});

export default Text;