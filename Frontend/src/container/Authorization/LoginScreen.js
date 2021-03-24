import AsyncStorage from '@react-native-community/async-storage';
import React, {Component, useState, createRef} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ImageBackground,
} from 'react-native';
import {loginInstance} from '../../api/accounts/login';
import Layout from '../../components/elements/layout';
export default function Login(props) {
  const {navigate} = props.navigation;
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const nameInputRef = createRef();
  const passwordInputRef = createRef();
  const LoginHandler = () => {
    var loginForm = new FormData();
    loginForm.append('username', userName);
    loginForm.append('password', userPassword);
    loginInstance(
      loginForm,
      (res) => {
        // AsyncStorage.setItem('jwt', res.data.token);
        console.log(res.data.token);
        alert('PASS');
        navigate('PinScreen');
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
      <Layout width={500} height={500} opacity={0.4}>
        <Text> 로그인 페이지</Text>
        <TextInput
          placeholder={'이메일을 입력해주세요'}
          onChangeText={(name) => setUserName(name)}
          ref={nameInputRef}
        />
        <TextInput
          placeholder={'비밀번호를 입력해주세요'}
          onChangeText={(pwd) => setUserPassword(pwd)}
          ref={passwordInputRef}
        />
        <Button title="로그인" onPress={() => LoginHandler()}></Button>
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
