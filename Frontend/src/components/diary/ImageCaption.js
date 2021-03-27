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
import BasicButton from '../../components/elements/BasicButton';
export default function ImageCaption({selectImg, wordsList, onHandlePress}) {
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
    <View style={[styles.container]}>
      <Image
        source={{
          uri: selectImg,
        }}
        style={[styles.img]}></Image>
      <Text style={[styles.describe]}>
        어떤 단어들이 나왔는지 확인해볼까요?
      </Text>
      <WordList words={wordsList}></WordList>
      <BasicButton
        text={'일기 쓰기'}
        btnWidth={width * 0.3}
        fontHoonPink={true}
        customFontSize={height * 0.04}
        onHandlePress={() => onHandlePress()}
      />
    </View>
  );
}

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const styles = StyleSheet.create({
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
