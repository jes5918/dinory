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
import RoundButton from '../../components/elements/RoundButton';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function GrammarCheck() {
  const url = require('../../assets/images/tutorial/IT1.png');
  // if (num === 1) {
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
          text={'Next'}
          color={'#56A4F1'}
          styleProps={{margin: width * 0.03}}
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
            minDelay={60}>
            안녕! 지금부터 같이 사진 일기를 써볼거에요. 먼저, 일기를 쓸 사진을
            선택해주세요! 사진 로딩이 조금 걸릴 수 있으니 선택 후 조금만
            기다려주세요!
          </TypeWriter>
        </View>
      </View>
    </ImageBackground>
  );
  // } else if (num === 2) {
  //   <View
  //     style={{
  //       position: 'absolute',
  //       bottom: 0,
  //       alignSelf: 'center',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       justifyContent: 'flex-end',
  //       alignItems: 'flex-end',
  //     }}>
  //     <RoundButton
  //       text={'Next'}
  //       color={'#56A4F1'}
  //       styleProps={{margin: width * 0.03}}
  //     />
  //     <View
  //       style={{
  //         backgroundColor: 'rgba(256, 256, 256, 0.8)',
  //         width: width,
  //         display: 'flex',
  //         flexDirection: 'row',
  //         justifyContent: 'center',
  //         alignItems: 'flex-start',
  //         padding: width * 0.01,
  //         // borderRadius: 30,
  //         height: height * 0.25,
  //         paddingHorizontal: width * 0.04,
  //         zIndex: 15,
  //         // flexWrap: wrap',
  //       }}>
  //       <TypeWriter
  //         style={{
  //           fontFamily: 'HoonPinkpungchaR',
  //           fontSize: width * 0.026,
  //           color: 'black',
  //           lineHeight: width * 0.04,
  //         }}
  //         typing={1}
  //         fixed={true}
  //         initialDelay={500}
  //         minDelay={60}>
  //         안녕! 지금부터 같이 사진 일기를 써볼거에요. 먼저, 일기를 쓸 사진을
  //         선택해주세요! 사진 로딩이 조금 걸릴 수 있으니 선택 후 조금만
  //         기다려주세요!
  //       </TypeWriter>
  //     </View>
  //   </View>;
  // }
}
