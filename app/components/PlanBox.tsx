import Text from '@/common/Text';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import Box from './Box';

type PlanBoxProps = {
  title: string;
  onAddPress: () => void;
  children?: React.ReactNode;
}

const PlanBox: React.FC<PlanBoxProps> = ({ title, onAddPress, children }) => {
  return (
    <Box>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onAddPress}>
          <Ionicons name="add-circle-outline" size={40} color={Colors.light.primary} />
        </Pressable>
      </View>
      <View style={styles.itemContainer}>
        {children}
      </View>
    </Box>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemContainer: {
    gap: 8
  }
});

export default PlanBox;