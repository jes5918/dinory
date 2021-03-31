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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
});
