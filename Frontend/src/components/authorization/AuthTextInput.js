import React from 'react';
import {StyleSheet, TextInput, Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');
const windowHeight = dimensions.height;

export default function AuthTextInput({
  text,
  width,
  height,
  size,
  setFunction,
  secureTextEntry,
  autoFocus,
  value,
  keyboardType,
  marginBottom,
  marginRight,
  margin,
}) {
  return (
    <TextInput
      style={[
        styles.textInput,
        {
          width: width || 274,
          height: height || 58,
          fontSize: size || 18,
          marginBottom: marginBottom,
          margin,
          marginRight: marginRight,
          fontFamily: 'NotoSansKR-Bold',
        },
      ]}
      secureTextEntry={secureTextEntry}
      placeholder={text}
      autoFocus={autoFocus}
      keyboardType={keyboardType}
      onChangeText={(value) =>
        setFunction
          ? setFunction(value)
          : alert('onChangeText에 State 함수를 내려주세요!')
      }
      value={value}
      placeholderTextColor="#707070"
      inlineImageLeft="lock"
    />
  );
}
const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'NotoSansKR-Regular',
    backgroundColor: '#E8E8E8',
    borderRadius: 14,
    elevation: 7,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: windowHeight * 0.03,
  },
});
