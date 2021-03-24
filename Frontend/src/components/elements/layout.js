import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

export default function Layout({width, height, opacity, children}) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.layout,
          {
            width: width || 'auto',
            height: height || 'auto',
            backgroundColor: `rgba(255,255,255,${opacity})`,
          },
        ]}>
        {children}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    // resizeMode ==이미지를 꽉 채워줌
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
<<<<<<< HEAD
    borderRadius: 30,
=======
    borderRadius: 50,
>>>>>>> 5299f0d7a8e289e4892b10081d840bf2e12cc04e
  },
});
