import React, {Component, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changePWForLost} from '../../api/accounts/login';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import Header from '../../components/elements/Header';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';

// static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768
const layoutWidth = windowWidth * 0.3718;
const layoutHeight = windowHeight * 0.755;

export default function ModifyPassword({navigation, route}) {
  const [userWritePassword, setUserWritePassword] = useState('');
  const [userCheckPassword, setUserCheckPassword] = useState('');
  const userID = route.params.user_ID;
  const submitHandler = async () => {
    let ChangePasswordForm = new FormData();
    ChangePasswordForm.append('password', userWritePassword);
    ChangePasswordForm.append('password_confirmation', userCheckPassword);

    changePWForLost(
      userID,
      ChangePasswordForm,
      (res) => {
        alert('비밀번호가 변경 되었습니다.');
        navigation.navigate('LoginScreen');
      },
      (error) => {
        alert('ERROR');
        console.log(error);
      },
    );
  };
  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.container}>
        <View style={styles.view}>
          <AuthTitle title={'비밀번호 변경'} />
        </View>
        <View style={styles.body}>
          <AuthTextInput
            text={'변경할 비밀번호를 입력해주세요'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserWritePassword}
            secureTextEntry={true}
            autoFocus={false}
            marginBottom={windowHeight * 0.043}
          />
          <AuthTextInput
            text={'한 번 더 입력해주세요.'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserCheckPassword}
            secureTextEntry={true}
            autoFocus={false}
          />
          {userWritePassword.length < 8 ? (
            <Text style={styles.alertMessage}>
              {' '}
              대,소문자 영어+숫자로 8자리 이상 적어주세요.
            </Text>
          ) : null}
          {userWritePassword !== userCheckPassword ? (
            <Text style={styles.alertMessage}>
              비밀번호가 일치하지 않습니다.
            </Text>
          ) : null}
        </View>
        <View style={styles.view}>
          <BasicButton
            text="변경"
            customFontSize={24}
            paddingHorizon={0}
            paddingVertical={11}
            btnWidth={windowWidth * 0.3}
            btnHeight={windowHeight * 0.08}
            borderRadius={14}
            onHandlePress={() => {
              submitHandler();
            }}
          />
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
    width: windowWidth * 0.4,
    height: windowHeight * 0.803,
    borderRadius: 30,
    elevation: 7,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  text_Pin: {
    fontSize: 18,
    width: windowWidth * 0.3,
    color: '#707070',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.3,
  },
  alertMessage: {
    color: 'red',
    fontSize: 18,
    marginBottom: windowHeight * 0.043,
    marginTop: windowHeight * 0.02,
    alignSelf: 'flex-start',
  },
});
