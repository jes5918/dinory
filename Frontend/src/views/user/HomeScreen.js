import React, {Component, useEffect, useState} from 'react';
import {validateToken, refreshToken} from '../../api/accounts/login';
import {
  StyleSheet,
  Text,
  Button,
  View,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function HomeScreen({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768 //752
  const layoutWidth = windowWidth * 0.5;
  const layoutHeight = windowHeight * 0.708;
  const [AutoLoginState, setAutoLoginState] = useState(false);
  const AutoLoginCheck = () => {
    AsyncStorage.getItem('AutoLogin').then((value) => {
      console.log('자동로그인');
    });
  };
  const Autologin = async () => {
    AutoLoginCheck();
    // 1.  디바이스에서 토큰을 받아옴
    await AsyncStorage.getItem('jwt').then((value) => {
      if (value !== null && value.length > 100) {
        // 토큰값이 널이 아니고 100자 이상이라면
        let CurrentTokenCheck = new FormData();
        console.log(value);
        CurrentTokenCheck.append('token', value);
        // 유효성 검사 준비
        validateToken(
          CurrentTokenCheck,
          (res) => {
            // 유효성 검사를 패스한 현재 토큰을 리프레쉬할 준비
            CurrentToken = new FormData();
            CurrentToken.append('token', res.data.token);
            refreshToken(
              CurrentToken,
              (res) => {
                const RefreshToken = res.data.token;
                console.log(RefreshToken);
                AsyncStorage.removeItem('jwt');
                AsyncStorage.setItem('jwt', RefreshToken);
                navigation.navigate('CreateProfile');
                // 디바이스에 리프레쉬 토큰 저장 후 이동
              },
              (error) => {
                console.log('리프레쉬 탈락', error);
                navigation.navigate('LoginScreen');
              },
            );
          },
          (error) => {
            console.log('유효성 탈락', error);
            navigation.navigate('LoginScreen');
          },
        );
      } else {
        console.log('자동로그인 미설정');
        navigation.navigate('LoginScreen');
      }
    });
  };
  return (
    <ScrollView style={styles.scroll}>
      <ImageBackground
        source={require('../../assets/images/background5.png')}
        style={styles.container}>
        <View style={styles.view_logo}>
          <View style={styles.logo}>
            <Image source={require('../../assets/images/logo.png')}></Image>
          </View>
        </View>
        <View>
          <Layout width={layoutWidth} height={layoutHeight} opacity={0}>
            <View style={styles.body}>
              <View style={styles.view}>
                <View style={styles.button_mg}>
                  <BasicButton
                    text={'회원가입'}
                    customFontSize={24}
                    paddingHorizon={24}
                    paddingVertical={11}
                    btnWidth={336}
                    btnHeight={73}
                    borderRadius={14}
                    onHandlePress={() =>
                      navigation.navigate('EmailAuthorization')
                    }></BasicButton>
                </View>
                <View style={styles.button_mg}>
                  <BasicButton
                    text={'로그인'}
                    customFontSize={24}
                    paddingHorizon={24}
                    paddingVertical={11}
                    btnWidth={336}
                    btnHeight={73}
                    borderRadius={14}
                    onHandlePress={() => Autologin()}></BasicButton>
                </View>
              </View>
            </View>
          </Layout>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_logo: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  button_mg: {
    margin: 32,
  },
  logo: {
    width: 595, //595
    height: 101, //101
    marginTop: 50,
    flex: 1,
  },
  body: {
    flex: 4,
  },
});
