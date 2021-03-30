import React, {Component, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {duflicationCheckID} from '../../api/accounts/signup';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import ArrowButton from '../../components/elements/ArrowButton';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';
export default function SingupSCreen({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.5;
  const layoutHeight = windowHeight * 0.83;
  const [userEmail, setUserEmail] = useState('');
  const emailAddress = AsyncStorage.getItem('email').then((value) => {
    setUserEmail(value);
  });
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordchk, setUserPasswordchk] = useState('');
  const [idAvailable, setIdAvailable] = useState(false);
  const idCheck = () => {
    let idCheckForm = new FormData();
    idCheckForm.append('username', userName);
    duflicationCheckID(
      idCheckForm,
      (res) => {
        const idcheck = res.data;
        console.log(idcheck);
        setIdAvailable(true);
        alert('사용가능한 아이디입니다.');
      },
      (error) => {
        alert('존재하는 아이디입니다.');
        console.log(error);
      },
    );
  };
  const SubmitHandler = () => {
    if (idAvailable) {
      if (userPassword === userPasswordchk) {
        AsyncStorage.setItem('username', userName);
        AsyncStorage.setItem('password', userPassword);
        AsyncStorage.setItem('password_confirmation', userPasswordchk);
        navigation.navigate('PinScreen');
      } else {
        alert('비밀번호가 일치하지않습니다.');
      }
    } else {
      alert('아이디 중복확인 하세요');
    }
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
        behavior={'height'}
        enabled={false}>
        <Layout width={layoutWidth} height={layoutHeight} opacity={1}>
          <ScrollView>
            <View style={styles.view}>
              <AuthTitle title={'회원가입'}></AuthTitle>
            </View>
            <View style={styles.body}>
              <AuthTextInput
                marginBottom={0}
                marginRight={11}
                text={'이메일을 입력해주세요'}
                width={500}
                height={58}
                size={18}
                setFunction={setUserEmail}
                secureTextEntry={false}
                autoFocus={false}
                margin={15}
                value={userEmail}
              />
              <View style={styles.text_Input_Button}>
                <AuthTextInput
                  marginBottom={0}
                  marginRight={11}
                  text={'아이디를 입력해주세요'}
                  width={374}
                  height={58}
                  size={18}
                  setFunction={setUserName}
                  setRef={nameInputRef}
                  secureTextEntry={false}
                  autoFocus={true}
                  margin={15}
                />
                <View style={{marginTop: 15, marginBottom: 15}}>
                  <BasicButton
                    text="중복확인"
                    customFontSize={18}
                    paddingHorizon={0}
                    paddingVertical={16}
                    btnWidth={111}
                    btnHeight={58}
                    borderRadius={14}
                    onHandlePress={() => idCheck()}></BasicButton>
                </View>
              </View>
              <AuthTextInput
                marginBottom={0}
                marginRight={11}
                text={'비밀번호를 입력해주세요'}
                width={500}
                height={58}
                size={18}
                setFunction={setUserPassword}
                secureTextEntry={true}
                autoFocus={false}
                margin={15}
              />
              <View style={{marginLeft: 15, marginRight: 15}}>
                <Text style={{color: '#707070'}}>
                  * 비밀번호는 대소문자(영어), 숫자 조합 8자리로 구성되어야
                  합니다
                </Text>
              </View>
              <AuthTextInput
                marginBottom={0}
                marginRight={11}
                text={'비밀번호를 한 번 더 입력해주세요'}
                width={500}
                height={58}
                size={18}
                setFunction={setUserPasswordchk}
                secureTextEntry={true}
                autoFocus={false}
                margin={15}
              />
            </View>
            <View style={{margin: 15}}>
              <View style={{flex: 0.5, justifyContent: 'flex-start'}}>
                {userPassword !== userPasswordchk ? (
                  <Text style={{color: '#FF0000'}}>
                    비밀번호가 일치하지 않습니다.
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={{margin: 15}}>
              <BasicButton
                text="다음"
                customFontSize={24}
                paddingHorizon={11}
                paddingVertical={24}
                btnWidth={500}
                btnHeight={73}
                borderRadius={14}
                onHandlePress={() => SubmitHandler()}></BasicButton>
            </View>
          </ScrollView>
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
    fontSize: 35,
    fontWeight: 'bold',
    color: '#707070',
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
    flex: 1,
  },
  textInput: {
    backgroundColor: '#E8E8E8',
    marginTop: 15,
    marginBottom: 15,
    width: 500,
    height: 58,
    fontSize: 18,
    borderRadius: 10,
    padding: 16,
  },
  id_Text_Input: {
    backgroundColor: '#E8E8E8',
    marginRight: 10,
    width: 374,
    height: 58,
    fontSize: 18,
    borderRadius: 10,
    padding: 16,
  },
  text_Input_Button: {
    flexDirection: 'row',
  },
});
