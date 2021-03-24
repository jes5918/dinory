import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, StyleSheet, Image, Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function Logo() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.logoBtn}
      onPress={() => navigation.navigate('Home')}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoBtn: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: height * 0.02,
    width: width * 0.18,
    height: height * 0.12,
  },
  logo: {
    resizeMode: 'center',
    alignSelf: 'center',
    width: width * 0.18,
  },
});
