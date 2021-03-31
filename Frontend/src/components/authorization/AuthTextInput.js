import React, {Component, useState} from 'react';
import {StyleSheet, ImageBackground, ScrollView, TextInput} from 'react-native';
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
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    padding: 16,
  },
});
