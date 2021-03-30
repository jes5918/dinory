import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

function BackgroundAbsolute({imageSrc, children}) {
  return (
    <ImageBackground source={imageSrc} style={styles.backgroundImage}>
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackgroundAbsolute;
