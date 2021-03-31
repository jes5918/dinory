import React, {Component, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  confirmEmail,
  TransmitCodeToEmail,
  confirmEmailCode,
  duflicationCheckID,
} from '../../api/accounts/signup';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import Header from '../../components/elements/Header';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768

export default function EmailAuthorization({navigation}) {
  const [userWriteEmail, setUserWriteEmail] = useState('');
  const [userWriteCode, setUserWriteCode] = useState('');
  const [userTicket, setUserTicket] = useState(0);
  const [randomAuthCode, setRandomAuthCode] = useState('');
  const Authenticate = async () => {
    if (userWriteEmail.length > 8) {
      console.log('들어옴');
      console.log(userWriteEmail);
      let emailAuthForm = new FormData();
      emailAuthForm.append('email', userWriteEmail);
      await AsyncStorage.setItem('email', userWriteEmail);
      console.log('들어옴2');
      // 이메일 중복 확인!
      confirmEmail(
        emailAuthForm,
        (res) => {
          console.log('중복 확인');
          console.log(res.data['success']);
          TransmitCodeToEmail(
            //인증 번호 전송
            emailAuthForm,
            (res) => {
              console.log('인증 번호 전송 확인');
              console.log(res.data);
              setUserTicket(res.data['id']);
              //번호표 저장
            },
            (error) => {
              console.log(error);
            },
          );
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };
  const ConfirmCode = () => {
    if (userWriteCode.length > 0) {
      const ConfirmForm = new FormData();
      ConfirmForm.append('code', userWriteCode);
      ConfirmForm.append('id', userTicket);
      console.log(userWriteCode);
      confirmEmailCode(
        ConfirmForm,
        (res) => {
          console.log(res.data);
          AsyncStorage.setItem('email', userWriteEmail);
          alert('인증이 완료되었습니다');
          navigation.navigate('SignupScreen');
        },
        (error) => {
          console.log(error);
          alert('인증번호가 틀렸습니다.');
        },
      );
    }
  };
  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.container}>
        <View style={styles.view}>
          <AuthTitle title={' 이메일 인증'} />
        </View>
        <View>
          <View style={styles.text_Input_Button}>
            <AuthTextInput
              marginRight={15}
              text={'이메일을 입력하세요'}
              width={windowWidth * 0.3}
              height={windowHeight * 0.08}
              size={18}
              setFunction={setUserWriteEmail}
              keyboardType={'email-address'}
              secureTextEntry={false}
              autoFocus={true}
            />
            <BasicButton
              text="중복확인"
              customFontSize={18}
              paddingHorizon={0}
              paddingVertical={11}
              btnWidth={windowHeight * 0.15}
              btnHeight={windowHeight * 0.08}
              borderRadius={10}
              onHandlePress={() => {
                Authenticate();
              }}
            />
          </View>
          <View style={styles.text_Input_Button}>
            <AuthTextInput
              marginRight={15}
              text={'인증번호를 입력하세요'}
              width={windowWidth * 0.3}
              height={windowHeight * 0.08}
              size={18}
              setFunction={setUserWriteCode}
              autoFocus={false}
              secureTextEntry={true}
            />
            <BasicButton
              text="인증"
              customFontSize={18}
              paddingHorizon={17}
              paddingVertical={16}
              btnWidth={windowHeight * 0.15}
              btnHeight={windowHeight * 0.08}
              borderRadius={10}
              onHandlePress={() => ConfirmCode()}
            />
          </View>
          <View
            style={{
              flex: 0.5,
              marginLeft: 40,
              fontSize: 18,
              justifyContent: 'flex-start',
            }}>
            {randomAuthCode !== userWriteCode ? (
              <Text style={{color: '#FF0000'}}>
                * 인증코드가 일치하지않습니다.
              </Text>
            ) : null}
          </View>
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
    width: windowWidth * 0.4984,
    height: windowHeight * 0.603,
    borderRadius: 30,
    elevation: 7,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.043 * 2,
    marginBottom: windowHeight * 0.043 * 4,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  text_Input_Button: {
    flexDirection: 'row',
    marginBottom: windowHeight * 0.043,
  },
});
