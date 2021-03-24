import React, {Component, createRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ImageBackground,
} from 'react-native';
import {
  loginInstance,
  confirmEmail,
  duflicationCheckID,
} from '../../api/accounts/signup';
import Layout from '../../components/elements/layout';
export default function Singup(props) {
  const {navigate} = props.navigation;
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordchk, setUserPasswordchk] = useState('');
  const [userPinNumber, setUserPinNumber] = useState('');
  const [userPinNumberchk, setUserPinNumberchk] = useState('');
  const emailInputRef = createRef();
  const nameInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordchkInputRef = createRef();
  const pinnumberInputRef = createRef();
  const pinnumberchkInputRef = createRef();

  const emailCheck = () => {
    var emailForm = new FormData();
    emailForm.append('email', userEmail);
    confirmEmail(
      emailForm,
      (res) => {
        const emailAuthNumber = res.data;
        console.log(emailAuthNumber);
        alert('emailAuthNumber OKAY');
      },
      (error) => {
        alert('ERROR');
        console.log(error);
      },
    );
  };
  const idCheck = () => {
    var idCheckForm = new FormData();
    idCheckForm.append('username', userName);
    duflicationCheckID(
      idCheckForm,
      (res) => {
        const idcheck = res.data;
        console.log(idcheck);
        alert('idcheck OKAY');
      },
      (error) => {
        alert('ERROR');
        console.log(error);
      },
    );
  };
  const SubmitHandler = () => {
    // if (userPassword === passwordchkInputRef) {ㄱ
    var signupForm = new FormData();
    signupForm.append('username', userName);
    signupForm.append('password', userPassword);
    signupForm.append('password_confirmation', userPasswordchk);
    signupForm.append('email', userEmail);
    signupForm.append('pin_code', userPinNumber);
    signupForm.append('pin_code_confirmation', userPinNumberchk);

    loginInstance(
      signupForm,
      (res) => {
        const token = res.data.token;
        alert('PASS');
        navigate('LoginScreen');
      },
      (error) => {
        alert('ERROR');
        console.log(error);
      },
    );
  };
  return (
    <ImageBackground
      source={require('../../assets/images/background5.png')}
      style={styles.container}>
      <Layout width={500} height={500} opacity={0.7}>
        <Text> 회원가입 페이지</Text>
        <View>
          <TextInput
            placeholder={'이메일을 입력해주세요'}
            onChangeText={(Email) => setUserEmail(Email)}
            ref={emailInputRef}
          />
          <Button title="이메일 중복확인" onPress={() => emailCheck()}></Button>
          <TextInput
            placeholder={'아이디을 입력해주세요'}
            onChangeText={(name) => setUserName(name)}
            ref={nameInputRef}
          />
          <Button title="아이디 중복확인" onPress={() => idCheck()}></Button>
          <TextInput
            placeholder={'비밀번호를 입력해주세요'}
            onChangeText={(pwd) => setUserPassword(pwd)}
            ref={passwordInputRef}
          />
          <Text>
            * 비밀번호는 대소문자(영어), 숫자 조합 8자리로 구성되어야 합니다
          </Text>
          <TextInput
            placeholder={'비밀번호를 한 번 더 입력해주세요'}
            onChangeText={(Pwdchk) => setUserPasswordchk(Pwdchk)}
            ref={passwordchkInputRef}
          />
          <TextInput
            placeholder={'핀 번호를 입력해주세요'}
            onChangeText={(Pin) => setUserPinNumber(Pin)}
            ref={pinnumberInputRef}
          />
          <TextInput
            placeholder={'핀 번호를 한 번 더 입력해주세요'}
            onChangeText={(Pinchk) => setUserPinNumberchk(Pinchk)}
            ref={pinnumberchkInputRef}
          />
        </View>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          {userPassword !== userPasswordchk ? (
            <Text style={styles.TextValidation}>
              비밀번호가 일치하지 않습니다.
            </Text>
          ) : null}
        </View>
        <Button title="회원가입" onPress={() => SubmitHandler()}></Button>
      </Layout>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
