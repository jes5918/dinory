import React from 'react';
import {View, Dimensions, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import ArrowButton from './ArrowButton';
import Profile from './Profile';

const LogoImage = () => {
  return (
    <View style={styles.logo}>
      <Image
        source={require('../../assets/images/logo_ver2.png')}
        style={styles.logoImage}
      />
    </View>
  );
};

function Header({children, logoHeader, onHandlePress}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <ArrowButton
        onHandlePress={() =>
          onHandlePress ? onHandlePress() : navigation.goBack()
        }
      />
      {children}
      {logoHeader ? <LogoImage /> : <Profile />}
    </View>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    position: 'absolute',
    top: windowHeight * 0.02,
    left: 0,
  },
  logo: {},

  logoImage: {
    resizeMode: 'contain',
    width: windowWidth * 0.25, //595
    height: windowHeight * 0.1, //101
  },
});

export default Header;
