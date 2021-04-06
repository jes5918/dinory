import React, {useEffect, useState} from 'react';
import {validateToken, refreshToken} from '../../api/accounts/login';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import BasicButton from '../../components/elements/BasicButton';
import AlertModal from '../../components/elements/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AuthBackGround from '../../components/authorization/AuthBackGround';

export default function HomeScreen({navigation, route}) {
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
                navigation.navigate('SelectProfile');
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
    <AuthBackGround>
      <Image
        style={styles.logoImage}
        source={require('../../assets/images/logo_ver2.png')}
      />
      <View style={styles.buttonContainer}>
        <BasicButton
          text={'회원가입'}
          customFontSize={hp('3.5%')}
          paddingHorizon={wp('2%')}
          paddingVertical={hp('5%')}
          btnWidth={wp('30%')}
          btnHeight={hp('8%')}
          borderRadius={14}
          onHandlePress={() => navigation.navigate('EmailAuthorization')}
        />
        <BasicButton
          text={'로그인'}
          customFontSize={hp('3.5%')}
          paddingHorizon={wp('2%')}
          paddingVertical={hp('5%')}
          btnWidth={wp('30%')}
          btnHeight={hp('8%')}
          borderRadius={14}
          backgroundColor={'#9979C2'}
          onHandlePress={() => navigation.navigate('LoginScreen')}
        />
      </View>
      <AlertModal
        modalVisible={modalVisible}
        onHandleCloseModal={() => changeModalState()}
        text={'로그인 되었습니다.'}
        iconName={'smileo'}
        color={'#A0A0FF'}
        setTimeFunction={() => closeModal()}
      />
    </AuthBackGround>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: wp('20%'),
    height: hp('20%'),
    resizeMode: 'contain',
    marginBottom: hp('10%'),
  },
  buttonContainer: {
    height: hp('30%'),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
