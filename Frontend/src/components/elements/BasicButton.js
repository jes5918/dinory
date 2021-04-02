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
  margin,
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
          paddingLeft: paddingHorizon || windowWidth * 0.00859375,
          paddingRight: paddingHorizon || windowWidth * 0.00859375,
          paddingBottom: paddingVertical || windowHeight * 0.014323,
          paddingTop: paddingVertical || windowHeight * 0.014323,
          backgroundColor: backgroundColor || '#FB537B',
          width: btnWidth || windowWidth * 0.4,
          height: btnHeight || windowHeight * 0.08,
          borderRadius: borderRadius || 14,
          margin: margin || 0,
        },
      ]}>
      <Text
        style={[
          styles.text,
          {
            fontSize: customFontSize || windowWidth * 0.01875,
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
