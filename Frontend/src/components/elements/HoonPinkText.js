import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function HoonPinkText({fontSize, children}) {
  return (
    <Text style={[styles.text, {fontSize: fontSize || 18}]}>{children}</Text>
  );
}
const styles = StyleSheet.create({
  text: {
    fontFamily: 'HoonPinkpungchaR',
  },
});
