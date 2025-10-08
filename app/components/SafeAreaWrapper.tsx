import { Colors } from '@/constants/Colors';
import { StyleSheet, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SafeAreaWrapperProps = ViewProps & {
  children: React.ReactNode;
};

export const SafeAreaWrapper = ({ children, style, ...props }: SafeAreaWrapperProps) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 16,
  },
});