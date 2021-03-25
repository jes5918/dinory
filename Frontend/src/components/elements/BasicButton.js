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
  onHandlePress,
  fontHoonPink,
}) {
  return (
    <TouchableOpacity
      onPress={() =>
        onHandlePress ? onHandlePress() : alert('함수를 props로 내려주세요!')
      }
      activeOpacity={0.7}
      style={[
        styles.container,
        {
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
      <Text
        style={[
          styles.text,
          {
            fontSize: customFontSize || 24,
            fontFamily: fontHoonPink ? 'HoonPinkpungchaR' : 'NotoSansKR-Bold',
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: windowWidth * 0.4,
    height: windowHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    elevation: 7,
  },
  text: {
    color: 'white',
  },
});

export default BasicButton;
