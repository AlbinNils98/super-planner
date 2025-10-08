
import { StyleSheet, Text, View } from 'react-native';
import RNToast from 'react-native-toast-message';

const Toast = () => {
  return (
    <RNToast
      topOffset={50}
      visibilityTime={3000}
      config={{
        success: (internalState) => (
          <View style={[styles.container, { backgroundColor: '#4CAF50' }]}>
            <View style={styles.innerContainer}>
              <Text style={styles.text1}>{internalState.text1}</Text>
              <Text style={styles.text2}>{internalState.text2}</Text>
            </View>
          </View>
        ),
        error: (internalState) => (
          <View style={[styles.container, { backgroundColor: '#F44336' }]}>
            <View style={styles.innerContainer}>
              <Text style={styles.text1}>{internalState.text1}</Text>
              <Text style={styles.text2}>{internalState.text2}</Text>
            </View>
          </View>
        ),
      }}
    />);
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 80,
    backgroundColor: '#F44336',
    padding: 2,
    borderRadius: 8,
    justifyContent: 'center'
  },
  text1: {
    color: 'white',
    fontWeight: 'bold'
  },
  text2: { color: 'white' },
  innerContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default Toast;