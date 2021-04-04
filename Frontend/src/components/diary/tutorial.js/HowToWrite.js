import React from 'react';
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
import ArrowButton from '../../elements/ArrowButton';

export default function HowToWrite({OnHandleGotoBack, OnHandleGotoNext}) {
  const url = require('../../../assets/images/tutorial/write.jpg');
  return (
    <ImageBackground
      source={url}
      style={{width: width, height: height, resizeMode: 'stretch'}}>
      <View
        style={{
          width: width,
          height: height,
          backgroundColor: 'black',
          position: 'absolute',
          zIndex: 12,
          opacity: 0.6,
        }}
      />
      <View style={styles.arrowBtnBox}>
        <ArrowButton onHandlePress={() => OnHandleGotoBack()} />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          zIndex: 15,
        }}>
        <RoundButton
          text={'Next'}
          color={'#56A4F1'}
          styleProps={{margin: width * 0.03}}
          onHandlePress={() => OnHandleGotoNext()}
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
            height: height * 0.25,
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
            이제 일기를 써볼꺼에요. 올린 사진에 대한 내용을 일기로 써볼까요?
            어떤 내용을 적을 지 모르겠다면, 아래 단어 박스의 단어를 참고해
            써보아요! 일기를 다 작성했다면, 문법 체크 버튼을 눌러 어떤 곳이
            틀렸는지 확인해보고 고쳐보아요! 만약 틀린 곳이 없다면, 디노가 나타나
            완벽하다고 알려줄거에요. 아! 일기를 다 작성한 후에 저장 버튼을 눌러
            저장하는 것 잊지 마세요!
          </TypeWriter>
        </View>
      </View>
    </ImageBackground>
  );
}
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const styles = StyleSheet.create({
  arrowBtnBox: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    overflow: 'visible',
    top: height * 0.02,
    left: '2%',
    zIndex: 33,
  },
});
