import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

function BasicButton({
  text,
  customFontSize,
  paddingHorizon,
  paddingVertical,
  borderRadius,
}) {
  return (
    // <View style={[styles.container, {width: btnWidth, height: btnHeight}]}>
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          fontSize: customFontSize,
          paddingLeft: paddingHorizon,
          paddingRight: paddingHorizon,
          paddingBottom: paddingVertical,
          paddingTop: paddingVertical,
          borderRadius: borderRadius,
        },
      ]}>
      <Text style={styles.text}>{text}</Text>
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
    width: 'auto',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  text: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
  },
});

export default BasicButton;
