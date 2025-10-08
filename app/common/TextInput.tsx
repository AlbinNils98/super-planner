import { Colors } from '@/constants/Colors';
import { TextInput as RNTextInput, TextInputProps, StyleSheet } from "react-native";

export const TextInput = (props: TextInputProps) => {
  return (
    <RNTextInput
      {...props}
      placeholderTextColor={Colors.light.text.secondary}
      style={[styles.default, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    height: 48,
    width: '100%',
    fontSize: 16,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "white",
    fontWeight: "bold"
  },
});