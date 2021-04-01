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
import AlertModal from '../../components/elements/AlertModal'; // static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768
const layoutWidth = windowWidth * 0.3718;
const layoutHeight = windowHeight * 0.755;

export default function ModifyPassword({navigation, route}) {
  const [userWritePassword, setUserWritePassword] = useState('');
  const [userCheckPassword, setUserCheckPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);
  const userID = route.params.user_ID;

  const submitHandler = async () => {
    console.log(!chkPW(userWritePassword));
    if (!chkPW(userWritePassword) && !chkPW(userCheckPassword)) {
      return;
    }
    let ChangePasswordForm = new FormData();
    ChangePasswordForm.append('password', userWritePassword);
    ChangePasswordForm.append('password_confirmation', userCheckPassword);

    changePWForLost(
      userID,
      ChangePasswordForm,
      (res) => {
        changeModalState();
        setTimeout(() => {
          navigation.navigate('LoginScreen');
        }, 2000);
      },
      (error) => {
        dchangeModalState();
        console.log(error);
      },
    );
  };
  const chkPW = (password) => {
    const pw = password;
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-zA-Z]/gi);
    const ENG = pw.search(/[A-Z]/gi);
    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    console.log('num :', num);
    console.log('eng :', eng);
    console.log('ENG :', ENG);
    console.log('spe :', spe);
    console.log(1);
    if (pw.length < 8 || pw.length > 20) {
      dchangeModalState();

      return false;
    } else if (pw.search(/\s/) !== -1) {
      dchangeModalState();

      return false;
    } else {
      return true;
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
        <AlertModal
          modalVisible={modalVisible}
          onHandleCloseModal={() => changeModalState()}
          text={'비밀번호가 수정되었어요!'}
          iconName={'smileo'}
          color={'#A0A0FF'}
          setTimeFunction={() => closeModal()}
        />
        <AlertModal
          modalVisible={dmodalVisible}
          onHandleCloseModal={() => dchangeModalState()}
          text={'비밀번호를 형식에 맞춰 작성하세요!'}
          iconName={'frowno'}
          color={'#FF0000'}
          setTimeFunction={() => dcloseModal()}
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
