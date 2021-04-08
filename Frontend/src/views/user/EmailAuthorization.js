import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
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
import CountDown from '../../components/elements/CountDown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768

export default function EmailAuthorization({navigation}) {
  const [userWriteEmail, setUserWriteEmail] = useState('');
  const [userWriteCode, setUserWriteCode] = useState('');
  const [userTicket, setUserTicket] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);
  const [bmodalVisible, setbModalVisible] = useState(false);
  const [cmodalVisible, setcModalVisible] = useState(false);
  const [emodalVisible, seteModalVisible] = useState(false);
  const [fmodalVisible, setfModalVisible] = useState(false);
  const [gmodalVisible, setgModalVisible] = useState(false);
  const [showToClock, setShowtoClock] = useState(false);
  const [pause, setPause] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const Authenticate = async () => {
    if (userWriteEmail.length > 8) {
      setSpinner(true);
      setPause(true);
      setShowtoClock(false);
      let emailAuthForm = new FormData();
      emailAuthForm.append('email', userWriteEmail);
      confirmEmail(
        emailAuthForm,
        (res) => {
          TransmitCodeToEmail(
            //인증 번호 전송
            emailAuthForm,
            (res) => {
              setSpinner(false);
              setDisabled(false);
              setShowtoClock(true);
              setUserTicket(res.data.id);
              bchangeModalState();
              //번호표 저장
            },
            (error) => {
              setSpinner(false);
            },
          );
        },
        (error) => {
          cchangeModalState();
          setSpinner(false);
        },
      );
    } else {
      echangeModalState();
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
          changeModalState();
          setPause(false);
          setShowtoClock(false);
          navigation.navigate('SignupScreen', {email: userWriteEmail});
        },
        (error) => {
          dchangeModalState();
        },
      );
    } else {
      fchangeModalState();
    }
  };
  const OnFinishedTimer = () => {
    gchangeModalState();
    setDisabled(true);
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
  const ecloseModal = () => {
    setTimeout(() => {
      seteModalVisible(!emodalVisible);
    }, 1500);
  };
  const echangeModalState = () => {
    seteModalVisible(!emodalVisible);
  };
  const fcloseModal = () => {
    setTimeout(() => {
      setfModalVisible(!fmodalVisible);
    }, 1500);
  };
  const fchangeModalState = () => {
    setfModalVisible(!fmodalVisible);
  };
  const gcloseModal = () => {
    setTimeout(() => {
      setgModalVisible(!gmodalVisible);
    }, 1500);
  };
  const gchangeModalState = () => {
    setgModalVisible(!gmodalVisible);
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
              marginRight={windowWidth * 0.01}
              text={'이메일을 입력하세요'}
              width={windowWidth * 0.3}
              height={windowHeight * 0.08}
              size={hp(2.8)}
              setFunction={setUserWriteEmail}
              keyboardType={'email-address'}
              secureTextEntry={false}
              autoFocus={true}
            />
            <BasicButton
              text="인증하기"
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
              marginRight={windowWidth * 0.01}
              text={'인증번호를 입력하세요'}
              width={windowWidth * 0.3}
              height={windowHeight * 0.08}
              size={hp(2.8)}
              setFunction={setUserWriteCode}
              autoFocus={false}
              secureTextEntry={true}
            />
            <BasicButton
              text="확인"
              customFontSize={hp(2.8)}
              btnWidth={windowHeight * 0.15}
              btnHeight={windowHeight * 0.08}
              borderRadius={10}
              onHandlePress={() => ConfirmCode()}
              disabled={disabled}
            />
          </View>
          {showToClock ? (
            <View style={styles.timer}>
              <Text style={styles.timerText}>남은시간 :</Text>
              <CountDown
                style={styles.counter}
                until={300}
                size={hp(2.8)}
                separatorStyle={{color: 'red'}}
                digitStyle={{backgroundColor: '#fff'}}
                digitTxtStyle={{color: 'red'}}
                timeToShow={['M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator
                running={pause}
                onFinish={() => {
                  OnFinishedTimer();
                }}
              />
            </View>
          ) : (
            <View style={{flex: 0.2}}></View>
          )}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}> 이미 아이디가 있나요?</Text>
            <Text
              style={styles.linkText}
              onPress={() => {
                navigation.navigate('LoginScreen');
                setPause(false);
                setShowtoClock(false);
              }}>
              로그인
            </Text>
          </View>
        </View>
        <AlertModal
          modalVisible={modalVisible}
          onHandleCloseModal={() => changeModalState()}
          text={'인증이 완료되었습니다!'}
          iconName={'smileo'}
          color={'green'}
          setTimeFunction={() => closeModal()}
        />
        <AlertModal
          modalVisible={dmodalVisible}
          onHandleCloseModal={() => dchangeModalState()}
          text={'인증번호가 틀렸습니다!'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => dcloseModal()}
        />
        <AlertModal
          modalVisible={bmodalVisible}
          onHandleCloseModal={() => bchangeModalState()}
          text={'인증번호를 보냈습니다'}
          iconName={'smileo'}
          color={'green'}
          setTimeFunction={() => bcloseModal()}
        />
        <AlertModal
          modalVisible={cmodalVisible}
          onHandleCloseModal={() => cchangeModalState()}
          text={'이미 등록된 이메일입니다'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => ccloseModal()}
        />
        <AlertModal
          modalVisible={emodalVisible}
          onHandleCloseModal={() => echangeModalState()}
          text={'이메일을 작성해주세요'}
          iconName={'frowno'}
          color={'#FF0000'}
          setTimeFunction={() => ecloseModal()}
        />
        <AlertModal
          modalVisible={fmodalVisible}
          onHandleCloseModal={() => fchangeModalState()}
          text={'인증번호를 작성해주세요'}
          iconName={'frowno'}
          color={'#FF0000'}
          setTimeFunction={() => fcloseModal()}
        />
        <AlertModal
          modalVisible={gmodalVisible}
          onHandleCloseModal={() => gchangeModalState()}
          text={'인증시간이 만료되었습니다'}
          iconName={'frowno'}
          color={'#FF0000'}
          setTimeFunction={() => gcloseModal()}
        />
        <ActivityIndicator
          size="large"
          color="#FB537B"
          style={{
            zIndex: 999,
            position: 'absolute',
            justifyContent: 'center',
            alignSelf: 'center',
            top: windowHeight * 0.5,
          }}
          animating={spinner}
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
    marginBottom: windowHeight * 0.04,
  },
  footerContainer: {
    flex: 0.5,
    flexDirection: 'row',
  },
  footerText: {
    fontSize: windowHeight * 0.025,
    color: '#8c8c8c',
    textAlign: 'left',
  },
  bottomContainer: {
    flex: 1.5,
  },
  linkText: {
    fontSize: windowHeight * 0.025,
    color: '#0A82FF',
    position: 'absolute',
    right: windowWidth * 0.01,
  },
  timerText: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: windowWidth * 0.01,
    fontSize: windowHeight * 0.025,
  },
  timer: {
    height: windowHeight * 0.06,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});
