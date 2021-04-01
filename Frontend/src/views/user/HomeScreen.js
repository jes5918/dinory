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
import AlertModal from '../../components/elements/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/core';

// static
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768 //752
const layoutWidth = windowWidth * 0.5;
const layoutHeight = windowHeight * 0.708;

export default function HomeScreen({navigation, route}) {
  // getAllKeys();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('autoLogin')
      .then((value) => {
        return JSON.parse(value);
      })
      .then((res) => {
        AutologinMount();
      });
  }, []);

  const AutologinMount = () => {
    // 1.  디바이스에서 토큰을 받아옴
    AsyncStorage.getItem('jwt').then((value) => {
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
                AsyncStorage.removeItem('jwt');
                AsyncStorage.setItem('jwt', RefreshToken);
                changeModalState();
                navigation.navigate('Main');
                // 디바이스에 리프레쉬 토큰 저장 후 이동
              },
              (error) => {
                navigation.navigate('LoginScreen');
              },
            );
          },
          (error) => {
            navigation.navigate('LoginScreen');
          },
        );
      } else {
      }
    });
  };

  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 1500);
  };
  const changeModalState = () => {
    setModalVisible(!modalVisible);
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
            <AlertModal
              modalVisible={modalVisible}
              onHandleCloseModal={() => changeModalState()}
              text={'로그인 되었습니다.'}
              iconName={'smileo'}
              color={'#A0A0FF'}
              setTimeFunction={() => closeModal()}
            />
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
