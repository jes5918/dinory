import React, {Component, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {signupInstance} from '../../api/accounts/signup';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import ArrowButton from '../../components/elements/ArrowButton';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';

export default function PinCreate({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.3718;
  const layoutHeight = windowHeight * 0.755;
  const [userPinNumber, setUserPinNumber] = useState('');
  const [userPinNumberchk, setUserPinNumberchk] = useState('');
  const [buttonChk, setButtonChk] = useState(false);
  const submitHandler = async () => {
    if (userPinNumber.length === 6 && userPinNumber === userPinNumberchk) {
      let pinAuthForm = new FormData();
      await AsyncStorage.getItem('username').then((username) => {
        pinAuthForm.append('username', username);
      });
      await AsyncStorage.getItem('password').then((password) => {
        pinAuthForm.append('password', password);
      });
      await AsyncStorage.getItem('password_confirmation').then(
        (password_confirmation) => {
          pinAuthForm.append('password_confirmation', password_confirmation);
        },
      );
      await AsyncStorage.getItem('email').then((email) => {
        pinAuthForm.append('email', email);
        pinAuthForm.append('pin_code', userPinNumber);
        pinAuthForm.append('pin_code_confirmation', userPinNumberchk);
      });
      signupInstance(
        pinAuthForm,
        (res) => {
          const token = res.data.token;
          console.log(token);
          AsyncStorage.removeItem('jwt');
          AsyncStorage.setItem('jwt', token);
          alert('회원가입 되었습니다.');
          console.log(token);
          navigation.navigate('LoginScreen');
        },
        (error) => {
          alert('ERROR');
          console.log(error);
        },
      );
    } else {
      alert('핀 번호가 일치하지않습니다.');
    }
  };
  return (
    <AuthBackGround>
      <View style={styles.start}>
        <View>
          <ArrowButton onHandlePress={() => navigation.goBack()}></ArrowButton>
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}></Image>
        </View>
      </View>
      <KeyboardAvoidingView style={styles.body} behavior={'height'}>
        <Layout width={layoutWidth} height={layoutHeight} opacity={1}>
          <View style={styles.view}>
            <AuthTitle title={'핀 번호 생성'}></AuthTitle>
          </View>
          <View style={styles.body}>
            <View style={styles.view}>
              <AuthTextInput
                text={'핀 번호 숫자 6자리를 입력해주세요'}
                width={326}
                height={58}
                size={18}
                setFunction={setUserPinNumber}
                secureTextEntry={true}
                autoFocus={true}
                margin={15}
              />
              <AuthTextInput
                text={'한 번 더 입력해주세요.'}
                width={326}
                height={58}
                size={18}
                setFunction={setUserPinNumberchk}
                secureTextEntry={true}
                autoFocus={false}
                margin={15}
              />
              <Text style={styles.text_Pin}>
                * 핀 번호는 프로필 추가, 변경,삭제 시에 활용합니다.
              </Text>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'flex-start',
                }}>
                {userPinNumber.length !== 6 ? (
                  <Text style={{color: '#FF0000'}}>
                    숫자 6자리를 입력하세요.
                  </Text>
                ) : null}
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'flex-start',
                }}>
                {userPinNumber !== userPinNumberchk ? (
                  <Text style={{color: '#FF0000'}}>
                    핀 번호가 일치하지 않습니다.
                  </Text>
                ) : null}
              </View>
              <View style={styles.view}>
                <BasicButton
                  text="완료"
                  customFontSize={24}
                  paddingHorizon={0}
                  paddingVertical={11}
                  btnWidth={336}
                  btnHeight={73}
                  borderRadius={14}
                  disabled={buttonChk}
                  onHandlePress={() => {
                    submitHandler();
                  }}></BasicButton>
              </View>
            </View>
          </View>
        </Layout>
      </KeyboardAvoidingView>
      {/* <View style={styles.end}></View> */}
    </AuthBackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  text_Pin: {
    fontSize: 18,
    width: 326,
    color: '#707070',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  start: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 4,
    textAlign: 'center',
    alignItems: 'center',
  },
  end: {
    flex: 1,
  },
  textInput: {
    backgroundColor: '#E8E8E8',
    width: 326,
    height: 58,
    fontSize: 18,
    borderRadius: 14,
    margin: 15,
    padding: 16,
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
});
