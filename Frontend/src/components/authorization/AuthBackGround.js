import React, {Component, useState} from 'react';
import {StyleSheet, ImageBackground, ScrollView} from 'react-native';
export default function AuthBackGround({children}) {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/background5.png')}>
      <ScrollView style={styles.scroll}>{children}</ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
});
