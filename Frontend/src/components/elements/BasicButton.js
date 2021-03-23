import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

function BasicButton({
  text,
  customFontSize,
  paddingHorizon,
  paddingVertical,
  backgroundColor,
  btnWidth,
  btnHeight,
  borderRadius,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          fontSize: customFontSize || 24,
          paddingLeft: paddingHorizon || 11,
          paddingRight: paddingHorizon || 11,
          paddingBottom: paddingVertical || 11,
          paddingTop: paddingVertical || 11,
          backgroundColor: backgroundColor || '#FB537B',
          width: btnWidth || windowWidth * 0.4,
          height: btnHeight || windowHeight * 0.08,
          borderRadius: borderRadius || 14,
        },
      ]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#FB537B',
    width: windowWidth * 0.4,
    height: windowHeight * 0.08,
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
