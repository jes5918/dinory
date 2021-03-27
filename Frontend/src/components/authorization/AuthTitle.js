import React, {Component, useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
  View,
  Text,
} from 'react-native';
export default function AuthTitle({title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> {title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
});
