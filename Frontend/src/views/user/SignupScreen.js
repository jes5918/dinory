import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {duflicationCheckID} from '../../api/accounts/signup';
import BasicButton from '../../components/elements/BasicButton';
import Header from '../../components/elements/Header';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';

// static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768

export default function SingupSCreen({navigation}) {
  const [userEmail, setUserEmail] = useState('');
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
      <Header logoHeader={true} />
      <View style={styles.container}>
        <View style={styles.view}>
          <AuthTitle title={'회원가입'} />
        </View>
        <View style={styles.body}>
          <View style={styles.text_Input_Button}>
            <AuthTextInput
              marginBottom={windowHeight * 0.043}
              text={'아이디를 입력해주세요'}
              width={windowWidth * 0.285}
              height={windowHeight * 0.08}
              size={18}
              setFunction={setUserName}
              secureTextEntry={false}
              autoFocus={false}
            />

            <BasicButton
              text="중복확인"
              customFontSize={18}
              paddingHorizon={0}
              paddingVertical={16}
              btnWidth={111}
              btnHeight={windowHeight * 0.08}
              borderRadius={14}
              onHandlePress={() => idCheck()}
            />
          </View>
          <AuthTextInput
            marginBottom={windowHeight * 0.02}
            text={'비밀번호를 입력해주세요'}
            width={windowWidth * 0.38}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserPassword}
            secureTextEntry={true}
            autoFocus={false}
          />
          <Text style={styles.text_Pin}>
            * 비밀번호는 대소문자(영어), 숫자 조합 8자리로 구성해야 합니다
          </Text>
          <AuthTextInput
            marginBottom={windowHeight * 0.02}
            text={'비밀번호를 한 번 더 입력해주세요'}
            width={windowWidth * 0.38}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserPasswordchk}
            secureTextEntry={true}
            autoFocus={false}
          />
          {userPassword !== userPasswordchk ? (
            <Text style={styles.alertMessage}>
              비밀번호가 일치하지 않습니다.
            </Text>
          ) : null}
        </View>
        <View style={styles.viewBottom}>
          <BasicButton
            text="다음"
            customFontSize={24}
            paddingHorizon={11}
            paddingVertical={24}
            btnWidth={windowWidth * 0.38}
            btnHeight={windowHeight * 0.08}
            borderRadius={14}
            onHandlePress={() => SubmitHandler()}
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
    width: windowWidth * 0.4984,
    height: windowHeight * 0.803,
    borderRadius: 30,
    elevation: 7,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.043 * 2,
    marginBottom: windowHeight * 0.043 * 2,
  },
  viewBottom: {
    marginTop: windowHeight * 0.043 * 1.5,
    marginBottom: windowHeight * 0.043 * 1,
  },
  text_Input_Button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.38,
  },
  text_Pin: {
    fontSize: 18,
    width: windowWidth * 0.38,
    color: '#707070',
    alignSelf: 'flex-start',
    marginBottom: windowHeight * 0.02,
  },
  alertMessage: {
    color: 'red',
    fontSize: 18,
    alignSelf: 'flex-start',
  },
});
