import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');
const height = dimensions.height;

export default function AuthTitle({title, marginBottom}) {
  return (
    <View style={[styles.container, {marginBottom: marginBottom}]}>
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
    fontFamily: 'NotoSansKR-Bold',
    fontSize: height * 0.06,
    fontWeight: 'bold',
    color: '#707070',
  },
});
