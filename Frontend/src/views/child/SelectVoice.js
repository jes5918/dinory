import React from 'react';
import {StyleSheet, View, ImageBackground, Dimensions} from 'react-native';
import Profile from '../../components/elements/Profile';
import ArrowButton from '../../components/elements/ArrowButton';
import SelectLayout from '../../components/elements/SelectLayout';
import {useNavigation} from '@react-navigation/core';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function SelectVoice() {
  const url = require('../../assets/images/background2.png');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground source={url} style={styles.bgImage}>
        <View style={styles.header}>
          <ArrowButton onHandlePress={() => navigation.goBack()} />
          <Profile />
        </View>
        <View style={styles.body}>
          <SelectLayout
            title={'원하는 목소리를 선택해주세요'}
            btnText={'변경완료'}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  body: {
    flex: 6,
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  innerUpper: {
    flex: 9,
    justifyContent: 'center',
  },
  innerLower: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
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
