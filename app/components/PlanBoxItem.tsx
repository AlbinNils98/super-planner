import Text from '@/common/Text';
import { Colors } from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

type PlanBoxItemProps = {
  title: string;
  onPress?: () => void;
}

const PlanBoxItem: React.FC<PlanBoxItemProps> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Entypo name="chevron-right" size={32} color={Colors.light.white} />

    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,

  },
  text: {
    color: Colors.light.text.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default PlanBoxItem;