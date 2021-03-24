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
export default function PinCreate(props) {
  const {navigate} = props.navigation;
  const [userPinNumber, setUserPinNumber] = useState('');
  const pinInputRef = React.createRef();
  const submitHandler = () => {
    var pinAuthForm = new FormData();
    pinAuthForm.append('email', userPinNumber);
    confirmEmail(
      pinAuthForm,
      (res) => {
        const pinAuthNumber = res.data;
        console.log(pinAuthNumber);
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
        <Text> 핀 번호 생성</Text>
        <TextInput
          placeholder={'핀번호를 입력하세요'}
          onChangeText={(Pin) => setUserPinNumber(Pin)}
          ref={pinInputRef}
        />
        <Button
          title="변경완료"
          onPress={() => {
            submitHandler();
          }}></Button>
        <TextInput placeholder={'핀 번호 인증'} />
        <Button title="인증"></Button>
        <Button title="다음" onPress={() => navigate('HomeScreen')}></Button>
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
