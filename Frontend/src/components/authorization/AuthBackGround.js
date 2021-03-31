import React from 'react';
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
