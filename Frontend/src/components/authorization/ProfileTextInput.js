import React, {Component, useState} from 'react';
import {StyleSheet, ImageBackground, ScrollView, TextInput} from 'react-native';
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
      value={value}></TextInput>
  );
}
const styles = StyleSheet.create({
  textInput: {
    fontFamily: 'HoonPinkpungchaR',
    backgroundColor: '#ffffff',
    borderRadius: 1000,
    padding: 16,
  },
});
