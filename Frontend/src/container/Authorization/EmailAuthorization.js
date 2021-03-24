import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ImageBackground,
} from 'react-native';
import {confirmEmail} from '../../api/accounts/signup';
import Layout from '../../components/elements/layout';
export default function EmailAuthorization(props) {
  const {navigate} = props.navigation;
  const [userEmail, setUserEmail] = useState('');
  const emailInputRef = React.createRef();
  const submitHandler = () => {
    var emailAuthForm = new FormData();
    emailAuthForm.append('email', userEmail);
    confirmEmail(
      emailAuthForm,
      (res) => {
        const emailAuthNumber = res.data;
        console.log(emailAuthNumber);
        alert('PASS');
      },
      (error) => {
        alert('ERROR');
        console.log(error);
      },
    );
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/background5.png')}>
      <Layout width={500} height={500} opacity={0.7}>
        <Text> 이메일 인증 페이지</Text>
        <TextInput
          placeholder={'이메일을 입력하세요'}
          onChangeText={(Email) => setUserEmail(Email)}
          ref={emailInputRef}
        />
        <Button
          title="이메일 인증"
          onPress={() => {
            submitHandler();
          }}></Button>
        <TextInput placeholder={'핀 번호 인증'} />
        <Button title="인증"></Button>
        <Button title="다음" onPress={() => navigate('SignupScreen')}></Button>
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
