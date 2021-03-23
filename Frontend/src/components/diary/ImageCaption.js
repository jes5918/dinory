import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import WordList from '../diary/WordList';

export default function ImageCaption() {
  const temp = [
    {textEn: 'happy', textKr: '행복'},
    {textEn: 'coding', textKr: '코딩'},
    {textEn: 'people', textKr: '사람'},
    {textEn: 'computer', textKr: '컴퓨터'},
    {textEn: 'computer', textKr: '컴퓨터'},
    {textEn: 'computer', textKr: '컴퓨터'},
    {textEn: 'computer', textKr: '컴퓨터'},
    {textEn: 'computer', textKr: '컴퓨터'},
  ];

  const url = require('../../assets/images/background3.png');
  return (
    <ImageBackground source={url} style={[styles.image]}>
      <View style={[styles.container]}>
        <Image
          source={{
            uri:
              'https://lh3.googleusercontent.com/proxy/ZvHW9p8a_HKw7bGpc7aHcMJ5MM36N2dhb0XNyPQ0RF_Jj3gKwL--LRfXVI_r2AARxjz8e-i4AxmSYF4ebK1lHfexef3uCPEMWFDZJiCfy0xSyjkbfaqcMpY',
          }}
          style={[styles.img]}></Image>
        <Text style={[styles.describe]}>
          어떤 단어들이 나왔는지 확인해볼까요?
        </Text>
        <WordList words={temp}></WordList>
      </View>
    </ImageBackground>
  );
}

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '1.5%',
  },

  img: {
    resizeMode: 'contain',
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  describe: {
    fontSize: 32,
    fontFamily: 'HoonPinkpungchaR',
    color: '#fff',
  },
});
