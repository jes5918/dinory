import React, {Component, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Header from '../../components/elements/Header';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';

// static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768
const layoutWidth = windowWidth * 0.3718;
const layoutHeight = windowHeight * 0.755;

export default function PinCreate({navigation}) {
  const [userPinNumber, setUserPinNumber] = useState('');
  const [userPinNumberchk, setUserPinNumberchk] = useState('');
  const [buttonChk, setButtonChk] = useState(false);
  const submitHandler = async () => {
    if (userPinNumber.length === 6 && userPinNumber === userPinNumberchk) {
      AsyncStorage.setItem('pin_code', userPinNumber);
      AsyncStorage.setItem('pin_code_confirmation', userPinNumberchk);
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
      <Header logoHeader={true} />
      <View style={styles.container}>
        <View style={styles.view}>
          <AuthTitle title={'핀 번호 생성'} />
        </View>
        <View style={styles.body}>
          <AuthTextInput
            text={'핀 번호 숫자 6자리를 입력해주세요'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserPinNumber}
            secureTextEntry={true}
            autoFocus={false}
            marginBottom={windowHeight * 0.043}
          />
          <AuthTextInput
            text={'한 번 더 입력해주세요.'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserPinNumberchk}
            secureTextEntry={true}
            autoFocus={false}
          />
          {userPinNumber.length !== 6 ? (
            <Text style={styles.alertMessage}>숫자 6자리를 입력하세요.</Text>
          ) : null}
          {userPinNumber !== userPinNumberchk ? (
            <Text style={styles.alertMessage}>
              핀 번호가 일치하지 않습니다.
            </Text>
          ) : null}
          <Text style={styles.text_Pin}>
            * 핀 번호는 프로필 추가, 변경,삭제 시에 활용합니다.
          </Text>
        </View>
        <View style={styles.view}>
          <BasicButton
            text="완료"
            customFontSize={24}
            paddingHorizon={0}
            paddingVertical={11}
            btnWidth={windowWidth * 0.3}
            btnHeight={windowHeight * 0.08}
            borderRadius={14}
            disabled={buttonChk}
            onHandlePress={() => {
              submitHandler();
            }}
          />
        </View>
      </View>
    </AuthBackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: windowWidth * 0.4,
    height: windowHeight * 0.803,
    borderRadius: 30,
    elevation: 7,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  text_Pin: {
    fontSize: 18,
    width: windowWidth * 0.3,
    color: '#707070',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.3,
  },
  alertMessage: {
    color: 'red',
    fontSize: 18,
    marginBottom: windowHeight * 0.043,
    marginTop: windowHeight * 0.02,
    alignSelf: 'flex-start',
  },
});
