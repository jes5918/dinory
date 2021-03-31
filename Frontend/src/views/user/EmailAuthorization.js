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
  const submitHandler = async () => {
    if (userEmail.length > 8) {
      let emailAuthForm = new FormData();
      console.log(userEmail);
      emailAuthForm.append('email', userEmail);
      await AsyncStorage.setItem('email', userEmail);
      confirmEmail(
        emailAuthForm,
        (res) => {
          const temp = res.data['인증코드'];
          if (temp === undefined) {
            alert('이미 가입된 이메일입니다.');
          } else {
            setemailAuthNumber(temp);
            alert('인증번호를 보냈습니다');
          }
        },
        (error) => {
          alert('이미 가입한 이메일입니다');
          console.log(error);
        },
      );
    } else {
      alert('이메일 형식이 아닙니다');
    }
  };
  const emailAuthNumberchk = () => {
    if (userAuth.length > 0) {
      console.log(emailAuthNumber);
      console.log(userAuth);
      emailAuthNumber === userAuth
        ? navigation.navigate('SignupScreen')
        : alert('인증번호가 틀렸습니다.');
    }
  };
  return (
    <AuthBackGround>
      <View style={styles.start}>
        <View>
          <ArrowButton onHandlePress={() => navigation.goBack()} />
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>
      <KeyboardAvoidingView style={styles.body} behavior={'height'}>
        <Layout width={layoutWidth} height={layoutHeight} opacity={1}>
          <View style={styles.view}>
            <AuthTitle title={' 이메일 인증'} />
          </View>
          <View>
            <View style={styles.text_Input_Button}>
              <AuthTextInput
                marginRight={11}
                text={'이메일을 입력하세요'}
                width={389}
                height={58}
                size={18}
                setFunction={setUserEmail}
                keyboardType={'email-address'}
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
                borderRadius={10}
                onHandlePress={() => {
                  submitHandler();
                }}
              />
            </View>
            <View style={styles.text_Input_Button}>
              <AuthTextInput
                marginRight={11}
                text={'인증번호를 입력하세요'}
                width={389}
                height={58}
                size={18}
                setFunction={setUserAuth}
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
                borderRadius={10}
                onHandlePress={() => emailAuthNumberchk()}
              />
            </View>
            <View
              style={{
                flex: 0.5,
                marginLeft: 40,
                fontSize: 18,
                justifyContent: 'flex-start',
              }}>
              {emailAuthNumber !== userAuth ? (
                <Text style={{color: '#FF0000'}}>
                  * 인증코드가 일치하지않습니다.
                </Text>
              ) : null}
            </View>
          </View>
        </Layout>
      </KeyboardAvoidingView>
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
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 4,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  end: {
    flex: 1,
  },
  text_Input_Button: {
    flexDirection: 'row',
    margin: 32,
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
});
