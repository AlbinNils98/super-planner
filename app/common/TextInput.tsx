import { TextInput as RNTextInput, TextInputProps, StyleSheet } from "react-native";

export const TextInput = (props: TextInputProps) => {
  return (
    <RNTextInput
      {...props}
      style={[styles.default, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 6,
  },
});