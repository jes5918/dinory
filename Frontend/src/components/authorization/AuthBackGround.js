import React, {Component, useState} from 'react';
import {StyleSheet, ImageBackground, Dimensions} from 'react-native';
export default function AuthBackGround({children}) {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/background5.png')}>
      {children}
    </ImageBackground>
  );
}

const dimension = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'absolute',
    width: dimension.width,
    height: dimension.height,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'stretch',
  },
});
