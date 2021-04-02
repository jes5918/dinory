import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Layout({width, height, opacity, children, styleProps}) {
  return (
    <View
      style={styleProps ? [styles.container, styleProps] : styles.container}>
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
    borderRadius: 30,
  },
});
