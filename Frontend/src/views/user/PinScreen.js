import React, {Component, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {signupInstance} from '../../api/accounts/signup';
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
import AlertModal from '../../components/elements/AlertModal';
// static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768

export default function PinCreate({navigation, route}) {
  const [userPinNumber, setUserPinNumber] = useState('');
  const [userPinNumberchk, setUserPinNumberchk] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);
  const [bmodalVisible, setbModalVisible] = useState(false);
  const UserInfo = route.params.userInfo;
  const submitHandler = async () => {
    if (userPinNumber.length === 6) {
      let pinAuthForm = new FormData();
      pinAuthForm.append('username', UserInfo.user_name);
      pinAuthForm.append('password', UserInfo.user_Pass);
      pinAuthForm.append('password_confirmation', UserInfo.user_Passchk);
      pinAuthForm.append('email', UserInfo.user_email);
      pinAuthForm.append('pin_code', userPinNumber);
      pinAuthForm.append('pin_code_confirmation', userPinNumberchk);

      signupInstance(
        pinAuthForm,
        (res) => {
          const token = res.data.token;
          AsyncStorage.removeItem('jwt');
          AsyncStorage.setItem('jwt', token);
          changeModalState();
          setTimeout(() => {
            navigation.navigate('SelectProfile');
          }, 2000);
        },
        (error) => {
          dchangeModalState();
        },
      );
    } else {
      bchangeModalState();
    }
  };
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 1500);
  };
  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };
  const dcloseModal = () => {
    setTimeout(() => {
      setdModalVisible(!dmodalVisible);
    }, 2000);
  };
  const dchangeModalState = () => {
    setdModalVisible(!dmodalVisible);
  };
  const bcloseModal = () => {
    setTimeout(() => {
      setbModalVisible(!bmodalVisible);
    }, 2000);
  };
  const bchangeModalState = () => {
    setbModalVisible(!bmodalVisible);
  };
  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.container}>
        <View style={styles.view}>
          <AuthTitle title={'핀 번호 생성'} />
        </View>
        <View style={styles.body}>
          <AuthTextInput
            text={'핀 번호 숫자 6자리를 입력해주세요'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserPinNumber}
            secureTextEntry={true}
            autoFocus={false}
            marginBottom={windowHeight * 0.043}
          />
          <AuthTextInput
            text={'한 번 더 입력해주세요.'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserPinNumberchk}
            secureTextEntry={true}
            autoFocus={false}
          />
          {userPinNumber.length !== 6 ? (
            <Text style={styles.alertMessage}>숫자 6자리를 입력하세요.</Text>
          ) : null}
          {userPinNumber !== userPinNumberchk ? (
            <Text style={styles.alertMessage}>
              핀 번호가 일치하지 않습니다.
            </Text>
          ) : null}
          <Text style={styles.text_Pin}>
            * 핀 번호는 프로필 추가, 변경,삭제 시에 활용합니다.
          </Text>
        </View>
        <View style={styles.view}>
          <BasicButton
            text="완료"
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
        <AlertModal
          modalVisible={modalVisible}
          onHandleCloseModal={() => changeModalState()}
          text={'회원가입 되었습니다.'}
          iconName={'smileo'}
          color={'#A0A0FF'}
          setTimeFunction={() => closeModal()}
        />
        <AlertModal
          modalVisible={dmodalVisible}
          onHandleCloseModal={() => dchangeModalState()}
          text={'핀 번호가 일치하지않습니다.'}
          iconName={'frowno'}
          color={'#FF0000'}
          setTimeFunction={() => dcloseModal()}
        />
        <AlertModal
          modalVisible={bmodalVisible}
          onHandleCloseModal={() => bchangeModalState()}
          text={'숫자 6자리로 입력해주세요.'}
          iconName={'smileo'}
          color={'#A0A0FF'}
          setTimeFunction={() => bcloseModal()}
        />
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
