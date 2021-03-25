import React, {Component, createRef, useState} from 'react';
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
import {
  loginInstance,
  confirmEmail,
  duflicationCheckID,
} from '../../api/accounts/signup';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import ArrowButton from '../../components/elements/ArrowButton';
export default function Singup({navigation}) {
  // const {navigate} = props.navigation;
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.5;
  const layoutHeight = windowHeight * 0.83;
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
    let emailForm = new FormData();
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
    let idCheckForm = new FormData();
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
    let signupForm = new FormData();
    signupForm.append('username', userName);
    signupForm.append('password', userPassword);
    signupForm.append('password_confirmation', userPasswordchk);
    signupForm.append('email', userEmail);
    signupForm.append('pin_code', userPinNumber);
    signupForm.append('pin_code_confirmation', userPinNumberchk);
    navigation.navigate('LoginScreen');
    // loginInstance(
    //   signupForm,
    //   (res) => {
    //     const token = res.data.token;
    //     alert('PASS');
    //     navigate('LoginScreen');
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
            source={require('../../assets/images/logo.png')}
            style={styles.logo}></Image>
        </View>
      </View>
      <View>
        <Layout width={layoutWidth} height={layoutHeight} opacity={1}>
          <View style={styles.view}>
            <Text style={styles.text}>회원가입</Text>
          </View>
          <View style={styles.body}>
            <TextInput
              style={styles.textInput}
              placeholder={'이메일을 입력해주세요'}
              onChangeText={(Email) => setUserEmail(Email)}
              ref={emailInputRef}
            />
            <View style={styles.text_Input_Button}>
              <TextInput
                style={styles.id_Text_Input}
                placeholder={'아이디를 입력해주세요'}
                onChangeText={(name) => setUserName(name)}
                ref={nameInputRef}
              />
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
            <TextInput
              style={styles.textInput}
              placeholder={'비밀번호를 입력해주세요'}
              onChangeText={(pwd) => setUserPassword(pwd)}
              ref={passwordInputRef}
            />
            <Text>
              * 비밀번호는 대소문자(영어), 숫자 조합 8자리로 구성되어야 합니다
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={'비밀번호를 한 번 더 입력해주세요'}
              onChangeText={(Pwdchk) => setUserPasswordchk(Pwdchk)}
              ref={passwordchkInputRef}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'핀 번호를 입력해주세요'}
              onChangeText={(Pin) => setUserPinNumber(Pin)}
              ref={pinnumberInputRef}
            />
            <TextInput
              style={styles.textInput}
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
          <BasicButton
            text="가입완료"
            customFontSize={24}
            paddingHorizon={11}
            paddingVertical={24}
            btnWidth={500}
            btnHeight={73}
            borderRadius={14}
            onHandlePress={() => SubmitHandler()}></BasicButton>
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
    margin: 30,
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#707070',
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
    // margin: 32,
  },
});
