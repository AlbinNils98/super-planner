import { Colors } from '@/constants/Colors';
import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from "react-native";

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ title, onPress, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled, style]}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && styles.disabledText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    height: 48,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.light.text.white,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  disabled: {
    backgroundColor: Colors.light.disabled,
  },
  disabledText: { color: Colors.light.text.disabled },
});

