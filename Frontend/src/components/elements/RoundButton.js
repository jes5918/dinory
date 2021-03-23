import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

function RoundButton({text, arrow}) {
  return (
    // <View style={[styles.container, {width: btnWidth, height: btnHeight}]}>
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {borderWidth: arrow ? 0 : 6, padding: arrow ? 4 : 10},
      ]}>
      {arrow ? (
        <FontAwesome5Icon
          style={styles.arrowIcon}
          name={'arrow-right'}
          color="white"
        />
      ) : (
        <Text textBreakStrategy={'simple'} style={styles.text}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width < 1280 ? 1280 : windowSize.width; // 1280
const windowHeight = windowSize.height < 768 ? 768 : windowSize.height; // 768

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#FB537B',
    width: 106,
    height: 106,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 10},
    elevation: 10,
  },
  text: {
    color: 'white',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 26,
    textAlign: 'center',
  },
  arrowIcon: {
    fontSize: 60,
  },
});

export default RoundButton;
