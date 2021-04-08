import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native';
import TypeWriter from 'react-native-typewriter';
import RoundButton from '../../elements/RoundButton';
import {useNavigation} from '@react-navigation/core';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function Intro() {
  const navigation = useNavigation();
  const url = require('../../../assets/images/last.png');
  return (
    <ImageBackground
      source={url}
      style={{width: width, height: height, resizeMode: 'stretch'}}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <RoundButton
          text={'다음'}
          color={'#56A4F1'}
          styleProps={{margin: width * 0.03}}
          onHandlePress={() => navigation.navigate('Main')}
        />
        <View
          style={{
            backgroundColor: 'rgba(256, 256, 256, 0.8)',
            width: width,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: width * 0.01,
            height: height * 0.35,
            paddingHorizontal: width * 0.04,
            zIndex: 15,
          }}>
          <TypeWriter
            style={{
              fontFamily: 'HoonPinkpungchaR',
              fontSize: width * 0.026,
              color: 'black',
              lineHeight: width * 0.04,
            }}
            typing={1}
            fixed={true}
            initialDelay={500}
            minDelay={20}>
            우와! 첫 번째 일기가 완성됐어요! 저장된 일기는 메인 페이지의 일기
            목록에서 확인할 수 있어요. 또한 추가한 단어들은 단어장에서 확인해볼
            수 있답니다! 이제 앞으로 매일 매일 소중한 기록을 다이노리에 함께
            기록해보기로 해요!
          </TypeWriter>
        </View>
      </View>
    </ImageBackground>
  );
}
