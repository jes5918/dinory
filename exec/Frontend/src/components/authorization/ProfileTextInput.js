import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';
export default function AuthTextInput({
  text,
  width,
  height,
  size,
  marginRight,
  setFunction,
  secureTextEntry,
  autoFocus,
  margin,
  value,
  elevation,
  maxLength,
  marginBottom,
}) {
  return (
    <TextInput
      style={[
        styles.textInput,
        {
          width: width || 274,
          height: height || 58,
          fontSize: size || 18,
          marginRight: marginRight || 11,
          margin,
          marginBottom: marginBottom || 0,
        },
      ]}
      maxLength={maxLength || 4}
      secureTextEntry={secureTextEntry}
      placeholder={text}
      autoFocus={autoFocus}
      onChangeText={(value) =>
        setFunction
          ? setFunction(value)
          : alert('onChangeText에 State 함수를 내려주세요!')
      }
      elevation={elevation}
      value={value}
    />
  );
}

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'HoonPinkpungchaR',
    backgroundColor: '#ffffff',
    borderRadius: 1000,
    paddingLeft: width * 0.03,
  },
});
