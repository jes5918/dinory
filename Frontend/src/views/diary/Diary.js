import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

export default function Diary() {
  const bgurl = require('../../assets/images/background3.png');
  return <ImageBackground source={bgurl}></ImageBackground>;
}

const styles = StyleSheet.create({});
