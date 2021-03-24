import React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function ArrowButton() {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.container]}>
      <FontAwesome5
        style={styles.arrowIcon}
        name={'chevron-left'}
        color="white"
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
    color: 'white',
    fontSize: windowWidth * 0.04,
  },
});

export default ArrowButton;
