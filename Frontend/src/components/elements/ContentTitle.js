import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function ContentTitle({title, opacity}) {
  return (
    <View
      style={[
        styles.titleContainer,
        {backgroundColor: `rgba(255,255,255,${opacity || 0.8})`},
      ]}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    // backgroundColor: 'rgba(255,255,255,0.8)',
    width: width * 0.4,
    height: height * 0.1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: height * 0.04,
    fontFamily: 'HoonPinkpungchaR',
  },
});
