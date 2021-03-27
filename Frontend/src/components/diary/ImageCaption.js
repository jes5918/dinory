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
              'https://img.freepik.com/free-photo/children-playing-on-grass_1098-504.jpg?size=626&ext=jpg&ga=GA1.2.1328069820.1610496000',
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
