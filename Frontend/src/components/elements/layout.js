import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

export default function Layout({width, height, opacity, children}) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.layout,
          {width, height, backgroundColor: `rgba(255,255,255,${opacity})`},
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
    // Customizing 부분
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
