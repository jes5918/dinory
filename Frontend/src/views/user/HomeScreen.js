import React, {useCallback, useEffect, useState} from 'react';
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
import {useFocusEffect} from '@react-navigation/core';

// static
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768 //752
const layoutWidth = windowWidth * 0.5;
const layoutHeight = windowHeight * 0.708;

// let allKeys = [];
// const getAllKeys = async () => {
//   try {
//     allKeys = await AsyncStorage.getAllKeys();
//   } catch (e) {
//     // read key error
//   }

//   console.log('getAllKeys : ', allKeys);
//   outputAsyncStorage(allKeys);
// };
// const outputAsyncStorage = async (keyArray) => {
//   if (keyArray) {
//     for (let key of keyArray) {
//       AsyncStorage.getItem(key).then((value) => {
//         console.log('KeyName : ', key, ', value : ', value);
//       });
//     }
//   }
// };

export default function HomeScreen({navigation, route}) {
  // getAllKeys();

  useEffect(() => {
    console.log('하이');
    AsyncStorage.getItem('autoLogin')
      .then((value) => {
        return JSON.parse(value);
      })
      .then((res) => {
        console.log(res);
        if (res) {
          AutologinMount();
        } else {
          console.log('자동로그인 미설정 마운트 확인');
        }
      });
  }, []);

  const AutologinMount = () => {
    // 1.  디바이스에서 토큰을 받아옴
    AsyncStorage.getItem('jwt').then((value) => {
      console.log(value);
      const accessToken = value;
      if (accessToken !== null && accessToken.length > 100) {
        // 토큰값이 널이 아니고 100자 이상이라면
        let CurrentTokenCheck = new FormData();
        CurrentTokenCheck.append('token', accessToken);
        // 유효성 검사 준비
        validateToken(
          CurrentTokenCheck,
          (res) => {
            // 유효성 검사를 패스한 현재 토큰을 리프레쉬할 준비
            const CurrentToken = new FormData();
            CurrentToken.append('token', res.data.token);
            refreshToken(
              CurrentToken,
              (res) => {
                const RefreshToken = res.data.token;
                AsyncStorage.getAllKeys((err, keys) => {
                  AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                      // get at each store's key/value so you can work with it
                      let key = store[i][0];
                      let value = store[i][1];
                      console.log('@@@@@@@', key + ' : ' + value);
                    });
                  });
                });
                AsyncStorage.removeItem('jwt');
                AsyncStorage.setItem('jwt', RefreshToken);
                alert('자동로그인 되었습니다.');
                navigation.navigate('Main');
                // 디바이스에 리프레쉬 토큰 저장 후 이동
              },
              (error) => {
                console.log('리프레쉬 탈락222', error);
                navigation.navigate('LoginScreen');
              },
            );
          },
          (error) => {
            console.log('유효성 탈락222', error);
            navigation.navigate('LoginScreen');
          },
        );
      } else {
        console.log('토큰이 없다');
      }
    });
  };

  return (
    <View style={styles.scroll}>
      <ImageBackground
        source={require('../../assets/images/background5.png')}
        style={styles.container}>
        <View style={styles.view_logo}>
          <Image
            style={styles.logoImage}
            source={require('../../assets/images/logo.png')}
          />
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
                    }
                  />
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
                    onHandlePress={() => navigation.navigate('LoginScreen')}
                  />
                </View>
              </View>
            </View>
          </Layout>
        </View>
      </ImageBackground>
    </View>
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
    marginTop: windowHeight * 0.2,
  },
  button_mg: {
    margin: 32,
  },
  logoImage: {
    marginTop: windowHeight * 0.3,
    width: windowWidth * 0.4, //595
    height: windowHeight * 0.17, //101
    resizeMode: 'contain',
  },
  body: {
    flex: 4,
  },
});
