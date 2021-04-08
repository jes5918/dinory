import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
export default function AuthBackGround({children}) {
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/background5.png')}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
