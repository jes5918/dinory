import React, {Component, useState, createRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

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
} from 'react-native';
import {confirmEmail} from '../../api/accounts/signup';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import ArrowButton from '../../components/elements/ArrowButton';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';
export default function EmailAuthorization({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.4984;
  const layoutHeight = windowHeight * 0.713;
  const [userEmail, setUserEmail] = useState('');
  const [userAuth, setUserAuth] = useState('');
  const [emailAuthNumber, setemailAuthNumber] = useState('');
  const emailInputRef = createRef();
  const userAuthRef = createRef();
  const submitHandler = () => {
    let emailAuthForm = new FormData();
    console.log(userEmail);
    emailAuthForm.append('email', userEmail);
    AsyncStorage.setItem('email', userEmail);
    confirmEmail(
      emailAuthForm,
      (res) => {
        const temp = res.data['인증코드'];
        setemailAuthNumber(temp);
        console.log(emailAuthNumber);
        alert('인증번호를 보냈습니다');
      },
      (error) => {
        alert('ERROR');
        console.log(error);
      },
    );
  };
  const emailAuthNumberchk = () => {
    console.log(emailAuthNumber);
    console.log(userAuth);
    emailAuthNumber === userAuth
      ? navigation.navigate('SignupScreen')
      : alert('인증번호가 틀렸습니다.');
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
      <View style={styles.body}>
        <Layout width={layoutWidth} height={layoutHeight} opacity={1}>
          <ScrollView>
            <View style={styles.view}>
              <AuthTitle title={' 이메일 인증'}></AuthTitle>
            </View>
            <View>
              <View style={styles.text_Input_Button}>
                <AuthTextInput
                  text={'이메일을 입력하세요'}
                  width={389}
                  height={58}
                  size={18}
                  setFunction={setUserEmail}
                  setRef={emailInputRef}
                  secureTextEntry={false}
                  autoFocus={true}
                />
                <BasicButton
                  text="중복확인"
                  customFontSize={18}
                  paddingHorizon={0}
                  paddingVertical={11}
                  btnWidth={98}
                  btnHeight={58}
                  borderRadius={14}
                  onHandlePress={() => {
                    submitHandler();
                  }}></BasicButton>
              </View>
              <View style={styles.text_Input_Button}>
                <AuthTextInput
                  text={'인증번호를 입력하세요'}
                  width={389}
                  height={58}
                  size={18}
                  setFunction={setUserAuth}
                  setRef={userAuthRef}
                  autoFocus={false}
                  secureTextEntry={true}
                />
                <BasicButton
                  text="인증"
                  customFontSize={18}
                  paddingHorizon={17}
                  paddingVertical={16}
                  btnWidth={98}
                  btnHeight={58}
                  borderRadius={14}
                  onHandlePress={() => emailAuthNumberchk()}></BasicButton>
              </View>
            </View>
          </ScrollView>
        </Layout>
      </View>
    </AuthBackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  start: {
    flex: 1.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 6,
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  text_Input_Button: {
    flexDirection: 'row',
    margin: 32,
  },
  // textInput: {
  //   backgroundColor: '#E8E8E8',
  //   width: 389,
  //   height: 58,
  //   fontSize: 18,
  //   borderRadius: 10,
  //   marginRight: 11,
  //   padding: 16,
  // },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
});
