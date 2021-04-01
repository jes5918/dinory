import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {
  confirmEmail,
  TransmitCodeToEmail,
  confirmEmailCode,
} from '../../api/accounts/signup';
import BasicButton from '../../components/elements/BasicButton';
import Header from '../../components/elements/Header';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';
import AlertModal from '../../components/elements/AlertModal';

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768

export default function EmailAuthorization({navigation}) {
  const [userWriteEmail, setUserWriteEmail] = useState('');
  const [userWriteCode, setUserWriteCode] = useState('');
  const [userTicket, setUserTicket] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);
  const [bmodalVisible, setbModalVisible] = useState(false);
  const [cmodalVisible, setcModalVisible] = useState(false);
  const Authenticate = async () => {
    if (userWriteEmail.length > 8) {
      let emailAuthForm = new FormData();
      emailAuthForm.append('email', userWriteEmail);
      await AsyncStorage.setItem('email', userWriteEmail);
      // 이메일 중복 확인!
      confirmEmail(
        emailAuthForm,
        (res) => {
          TransmitCodeToEmail(
            //인증 번호 전송
            emailAuthForm,
            (res) => {
              setUserTicket(res.data.id);
              bchangeModalState();
              //번호표 저장
            },
            (error) => {},
          );
        },
        (error) => {
          cchangeModalState();
        },
      );
    }
  };

  const ConfirmCode = () => {
    if (userWriteCode.length > 0) {
      const ConfirmForm = new FormData();
      ConfirmForm.append('code', userWriteCode);
      ConfirmForm.append('id', userTicket);
      confirmEmailCode(
        ConfirmForm,
        (res) => {
          AsyncStorage.setItem('email', userWriteEmail);
          changeModalState();
          navigation.navigate('SignupScreen');
        },
        (error) => {
          dchangeModalState();
        },
      );
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
    }, 1500);
  };
  const bchangeModalState = () => {
    setbModalVisible(!bmodalVisible);
  };
  const ccloseModal = () => {
    setTimeout(() => {
      setcModalVisible(!cmodalVisible);
    }, 1500);
  };
  const cchangeModalState = () => {
    setcModalVisible(!cmodalVisible);
  };
  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.container}>
        <View style={styles.view}>
          <AuthTitle title={'이메일 인증'} />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.text_Input_Button}>
            <AuthTextInput
              marginRight={15}
              text={'이메일을 입력하세요'}
              width={windowWidth * 0.3}
              height={windowHeight * 0.08}
              size={windowHeight * 0.025}
              setFunction={setUserWriteEmail}
              keyboardType={'email-address'}
              secureTextEntry={false}
              autoFocus={true}
            />
            <BasicButton
              text="중복확인"
              customFontSize={windowHeight * 0.025}
              btnWidth={windowHeight * 0.15}
              btnHeight={windowHeight * 0.08}
              borderRadius={10}
              onHandlePress={() => {
                Authenticate();
              }}
            />
          </View>
          <View style={styles.text_Input_Button}>
            <AuthTextInput
              marginRight={15}
              text={'인증번호를 입력하세요'}
              width={windowWidth * 0.3}
              height={windowHeight * 0.08}
              size={windowHeight * 0.025}
              setFunction={setUserWriteCode}
              autoFocus={false}
              secureTextEntry={true}
            />
            <BasicButton
              text="인증"
              customFontSize={windowHeight * 0.025}
              btnWidth={windowHeight * 0.15}
              btnHeight={windowHeight * 0.08}
              borderRadius={10}
              onHandlePress={() => ConfirmCode()}
            />
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}> 이미 아이디가 있나요?</Text>
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('LoginScreen')}>
              로그인
            </Text>
          </View>
        </View>
        <AlertModal
          modalVisible={modalVisible}
          onHandleCloseModal={() => changeModalState()}
          text={'인증이 완료되었습니다!'}
          iconName={'smileo'}
          color={'#A0A0FF'}
          setTimeFunction={() => closeModal()}
        />
        <AlertModal
          modalVisible={dmodalVisible}
          onHandleCloseModal={() => dchangeModalState()}
          text={'인증번호가 틀렸습니다!'}
          iconName={'frowno'}
          color={'#FF0000'}
          setTimeFunction={() => dcloseModal()}
        />
        <AlertModal
          modalVisible={bmodalVisible}
          onHandleCloseModal={() => bchangeModalState()}
          text={'인증번호를 보냈습니다'}
          iconName={'smileo'}
          color={'#A0A0FF'}
          setTimeFunction={() => bcloseModal()}
        />
        <AlertModal
          modalVisible={cmodalVisible}
          onHandleCloseModal={() => cchangeModalState()}
          text={'이미 등록된 이메일입니다'}
          iconName={'frowno'}
          color={'#FF0000'}
          setTimeFunction={() => ccloseModal()}
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
    width: windowWidth * 0.4984,
    height: windowHeight * 0.603,
    borderRadius: 30,
    elevation: 7,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  text_Input_Button: {
    flexDirection: 'row',
    marginBottom: windowHeight * 0.043,
  },
  footerContainer: {
    flex: 0.5,
    flexDirection: 'row',
  },
  footerText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: windowHeight * 0.02,
    color: '#8c8c8c',
    textAlign: 'left',
  },
  bottomContainer: {
    flex: 1.5,
  },
  linkText: {
    fontFamily: 'NotoSansKR-Bold',
    fontSize: windowHeight * 0.02,
    color: '#0A82FF',
    position: 'absolute',
    right: windowWidth * 0.01,
  },
});
