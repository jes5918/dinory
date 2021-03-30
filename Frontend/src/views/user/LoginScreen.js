import AsyncStorage from '@react-native-community/async-storage';
import React, {Component, useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  CheckBox,
  Text,
} from 'react-native';
import {loginInstance} from '../../api/accounts/login';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import ArrowButton from '../../components/elements/ArrowButton';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';
export default function LoginScreen({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.3718;
  const layoutHeight = windowHeight * 0.708;
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [storeId, setStoreId] = useState(false);
  const LoginHandler = async () => {
    let loginForm = new FormData();
    loginForm.append('username', userName);
    loginForm.append('password', userPassword);
    loginInstance(
      loginForm,
      (res) => {
        AsyncStorage.setItem('jwt', res.data.token);
        alert('로그인 되었습니다.');
        navigation.navigate('CreateProfile');
      },
      (error) => {
        alert('비밀번호가 잘못되었습니다');
        console.log(error);
      },
    );
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
      <KeyboardAvoidingView
        style={styles.body}
        behavior={'pedding'}
        keyboardVerticalOffset={100}>
        <Layout width={layoutWidth} height={layoutHeight} opacity={1}>
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
                secureTextEntry={true}
                autoFocus={false}
                margin={10}
              />
            </View>
            <View style={styles.start}>
              <View style={styles.checkOption}>
                <CheckBox
                  value={autoLogin}
                  onValueChange={setAutoLogin}
                  style={styles.checkBox}></CheckBox>
                <Text style={styles.label}>자동 로그인</Text>
              </View>
              <View style={styles.checkOption}>
                <CheckBox
                  value={storeId}
                  onValueChange={setStoreId}
                  style={styles.checkBox}></CheckBox>
                <Text style={styles.label}>아이디 저장</Text>
              </View>
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
        </Layout>
      </KeyboardAvoidingView>
      {/* <View style={styles.end}></View> */}
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
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkOption: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 61,
  },
  label: {
    margin: 7,
  },
  checkbBox: {
    alignSelf: 'center',
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
    flex: 1,
  },
});
