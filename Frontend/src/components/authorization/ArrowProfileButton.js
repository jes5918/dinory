import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function ArrowProfileButton({onHandlePress}) {
  return (
    <TouchableOpacity
      onPress={() =>
        onHandlePress ? onHandlePress() : alert('함수를 props로 내려주세요!')
      }
      actvieOpacity={0.7}
      style={styles.container}>
      <FontAwesome5
        style={styles.arrowIcon}
        name={'arrow-circle-right'}
        color="red"
      />
    </TouchableOpacity>
  );
}
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'transparent',
    width: windowWidth * 0.05,
    height: windowWidth * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    padding: 10,
  },
  arrowIcon: {
    color: '#FB537B',
    fontSize: windowWidth * 0.04,
  },
});

export default ArrowProfileButton;
