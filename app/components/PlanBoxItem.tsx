import { Text, Pressable, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Feather, Entypo } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type PlanBoxItemProps = {
  title: string;
  onPress: () => void;
  onDelete?: () => void;
  style?: StyleProp<ViewStyle>
};

function RightAction(
  progress: SharedValue<number>,
  drag: SharedValue<number>,
  onDelete?: () => void
) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: Math.min(drag.value + 80, 0) }],
  }));

  return (
    <Reanimated.View style={[styles.rightAction, animatedStyle]}>
      <Pressable onPress={onDelete} style={({ pressed }) => [
        styles.deleteButton,
        { backgroundColor: pressed ? '#cc0000' : 'red' },
      ]}
      >
        <Feather name="trash-2" color="white" size={24} />
      </Pressable>
    </Reanimated.View>
  );
}

export const PlanBoxItem: React.FC<PlanBoxItemProps> = ({ title, onPress, onDelete, style }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <ReanimatedSwipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={20}
      renderRightActions={(progress, drag) => RightAction(progress, drag, onDelete)}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Reanimated.View style={[styles.container, animatedStyle, style]}>
          <Text style={styles.text}>{title}</Text>
          <Entypo name="chevron-right" size={32} color={Colors.light.white} />
        </Reanimated.View>
      </Pressable>
    </ReanimatedSwipeable>
  );
};

export default PlanBoxItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.primary,
    padding: 20,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: Colors.light.white,
    fontWeight: 'bold'
  },
  rightAction: {
    backgroundColor: 'red',
    justifyContent: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 90,
    marginVertical: 2,
    alignItems: 'flex-end',
    overflow: 'hidden',
  },

  deleteButton: {
    position: 'absolute',
    right: 0,
    width: 90,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});