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
} from 'react-native';
import {loginInstance} from '../../api/accounts/login';
import Layout from '../../components/elements/layout';
import BasicButton from '../../components/elements/BasicButton';
import ArrowButton from '../../components/elements/ArrowButton';
export default function Login(props) {
  const {navigate} = props.navigation;
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
    var loginForm = new FormData();
    loginForm.append('username', userName);
    loginForm.append('password', userPassword);
    navigate('PinScreen');
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
    <ImageBackground
      source={require('../../assets/images/background5.png')}
      style={styles.container}>
      <View style={styles.start}>
        <View>
          <ArrowButton></ArrowButton>
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../assets/images/logo4.png')}
            style={styles.logo}></Image>
        </View>
      </View>
      <View style={styles.body}>
        <Layout width={layoutWidth} height={layoutHeight} opacity={1}>
          <View style={styles.view}>
            <Text style={styles.text}>로그인</Text>
          </View>

          <View style={styles.view}>
            <TextInput
              style={styles.textinput}
              placeholder={'이메일을 입력해주세요'}
              onChangeText={(name) => setUserName(name)}
              ref={nameInputRef}
            />
            <TextInput
              style={styles.textinput}
              placeholder={'비밀번호를 입력해주세요'}
              onChangeText={(pwd) => setUserPassword(pwd)}
              ref={passwordInputRef}
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
              onHandlePress={() => LoginHandler()}></BasicButton>
          </View>
        </Layout>
      </View>
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
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  textinput: {
    backgroundColor: '#E8E8E8',
    margin: 10,
    width: 336,
    height: 58,
    fontSize: 18,
    borderRadius: 10,
    padding: 16,
  },
  start: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 200 / 80,
  },
  body: {
    flex: 8,
  },
});
