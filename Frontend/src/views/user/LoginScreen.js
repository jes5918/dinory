import AsyncStorage from '@react-native-community/async-storage';
import React, {Component, useState, createRef} from 'react';
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

import {loginInstance} from '../../api/accounts/login';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import ArrowButton from '../../components/elements/ArrowButton';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';
export default function Login({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.3718;
  const layoutHeight = windowHeight * 0.708;
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const nameInputRef = createRef();
  const passwordInputRef = createRef();
  const LoginHandler = () => {
    let loginForm = new FormData();
    loginForm.append('username', userName);
    loginForm.append('password', userPassword);
    navigation.navigate('HomeScreen');
    console.log(userName);
    // loginInstance(
    //   loginForm,
    //   (res) => {
    //     // AsyncStorage.setItem('jwt', res.data.token);
    //     console.log(res.data.token);
    //     alert('PASS');
    //     navigate('PinScreen');
    //   },
    //   (error) => {
    //     alert('ERROR');
    //     console.log(error);
    //   },
    // );
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
              <AuthTitle title={'로그인'}></AuthTitle>
            </View>
            <View style={styles.body}>
              <View style={styles.view}>
                <AuthTextInput
                  text={'아이디를 입력하세요'}
                  width={339}
                  height={58}
                  size={18}
                  setFunction={setUserName}
                  setRef={nameInputRef}
                  secureTextEntry={false}
                  autoFocus={true}
                  margin={10}
                />
                <AuthTextInput
                  text={'비밀번호를 입력해주세요'}
                  width={339}
                  height={58}
                  size={18}
                  setFunction={setUserPassword}
                  setRef={passwordInputRef}
                  secureTextEntry={true}
                  autoFocus={true}
                  margin={10}
                />
              </View>
              <View style={styles.view}>
                <BasicButton
                  text="로그인"
                  customFontSize={24}
                  paddingHorizon={24}
                  paddingVertical={11}
                  btnWidth={336}
                  btnHeight={58}
                  borderRadius={14}
                  margin={10}
                  onHandlePress={() => LoginHandler()}></BasicButton>
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
  textInput: {
    backgroundColor: '#E8E8E8',
    margin: 15,
    width: 336,
    height: 58,
    fontSize: 18,
    borderRadius: 10,
    padding: 16,
  },
  start: {
    flex: 1.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
  body: {
    flex: 4,
  },
  end: {
    flex: 4,
  },
});
