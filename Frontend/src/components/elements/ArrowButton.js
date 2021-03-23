import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function ArrowButton({text}) {
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
const windowWidth = windowSize.width < 1280 ? 1280 : windowSize.width; // 1280
const windowHeight = windowSize.height < 768 ? 768 : windowSize.height; // 768

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'transparent',
    width: 106,
    height: 106,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    padding: 10,
  },
  arrowIcon: {
    color: 'white',
    fontSize: 46,
  },
});

export default ArrowButton;
