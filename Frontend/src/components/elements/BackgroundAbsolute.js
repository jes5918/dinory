import React from 'react';
import {ImageBackground, Dimensions, StyleSheet} from 'react-native';

function BackgroundAbsolute({imageSrc, children}) {
  return (
    <ImageBackground source={imageSrc} style={styles.backgroundImage}>
      {children}
    </ImageBackground>
  );
}

const dimension = Dimensions.get('window');
const windowWidth = dimension.width;
const windowHeight = dimension.height;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'stretch',
  },
});

export default BackgroundAbsolute;
