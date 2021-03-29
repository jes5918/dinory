import React, {Component, useState} from 'react';
import {StyleSheet, ImageBackground, ScrollView, TextInput} from 'react-native';
export default function AuthTextInput({
  text,
  width,
  height,
  size,
  marginRight,
  setFunction,
  setRef,
  secureTextEntry,
  autoFocus,
  margin,
  onHandleChange,
  value,
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
      secureTextEntry={secureTextEntry}
      placeholder={text}
      autoFocus={autoFocus}
      onChangeText={(value) =>
        setFunction
          ? setFunction(value)
          : alert('onChangeText에 State 함수를 내려주세요!')
      }
      onChange={() => {
        onHandleChange ? onHandleChange() : null;
      }}
      ref={setRef}
      value={value}></TextInput>
  );
}
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    padding: 16,
  },
});
