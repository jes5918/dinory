import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// components
import AlertModal from '../../components/elements/AlertModal';
import BasicButton from '../../components/elements/BasicButton';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import {changePassword} from '../../api/accounts/settings';
import AuthTitle from '../../components/authorization/AuthTitle';

// static variable
const backgroundImage = require('../../assets/images/background2.png');
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768

function PassWordUpdate() {
  const navigation = useNavigation();

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertForEnter, setAlertForEnter] = useState(false);
  const [alertForSame, setAlertForSame] = useState(false);
  const [alertForOld, setAlertForOld] = useState(false);
  const onHandleSubmit = async () => {
    // validation 로직
    if (!chkPW(password)) {
      setAlertForEnter(true);
      return;
    } else {
      setAlertForEnter(false);
    }
    if (password !== passwordCheck) {
      setAlertForSame(true);
      return;
    } else {
      setAlertForSame(false);
    }
    if (password === oldPassword) {
      setAlertForOld(true);
      return;
    } else {
      setAlertForOld(false);
    }
    const newPasswordForm = new FormData();
    newPasswordForm.append('old_password', oldPassword);
    newPasswordForm.append('password', password);
    newPasswordForm.append('password_confirmation', passwordCheck);
    changePassword(
      newPasswordForm,
      (res) => {
        changeModalState();
      },
      (err) => {
        changeModalStateForEnter();
      },
    );
  };
  const chkPW = (password) => {
    let chk1 = /^[a-zA-Z0-9]{8,20}$/;
    let chk2 = /[a-z]/;
    let chk3 = /[A-Z]/;
    let chk4 = /\d/;

    return chk1.test(password) &&
      chk2.test(password) &&
      chk3.test(password) &&
      chk4.test(password)
      ? true
      : false;
  };
  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
      navigation.navigate('Main');
    }, 1500);
  };

  const changeModalStateForEnter = () => {
    setAlertForEnter(!alertForEnter);
  };

  const closeModalForEnter = () => {
    setTimeout(() => {
      setAlertForEnter(!alertForEnter);
    }, 1500);
  };
  const changeModalStateForSame = () => {
    setAlertForSame(!alertForSame);
  };
  const closeModalForSame = () => {
    setTimeout(() => {
      setAlertForSame(!alertForSame);
    }, 1500);
  };
  const changeModalStateForOld = () => {
    setAlertForOld(!alertForOld);
  };
  const closeModalForOld = () => {
    setTimeout(() => {
      setAlertForOld(!alertForOld);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <AlertModal
        modalVisible={modalVisible}
        onHandleCloseModal={() => changeModalState()}
        text={'비밀번호가 변경되었습니다.'}
        iconName={'checkcircle'}
        color={'green'}
        setTimeFunction={() => closeModal()}
      />
      <AlertModal
        modalVisible={alertForEnter}
        onHandleCloseModal={() => changeModalStateForEnter()}
        text={'비밀번호를 정확히 입력해주세요!'}
        iconName={'exclamationcircle'}
        color={'red'}
        setTimeFunction={() => closeModalForEnter()}
      />
      <AlertModal
        modalVisible={alertForSame}
        onHandleCloseModal={() => changeModalStateForSame()}
        text={'비밀번호가 일치하지 않습니다!'}
        iconName={'exclamationcircle'}
        color={'red'}
        setTimeFunction={() => closeModalForSame()}
      />
      <AlertModal
        modalVisible={alertForOld}
        onHandleCloseModal={() => changeModalStateForOld()}
        text={'변경할 비밀번호는 현재 비밀번호와 일치할 수 없습니다.'}
        iconName={'exclamationcircle'}
        color={'red'}
        setTimeFunction={() => closeModalForOld()}
      />
      <BackgroundAbsolute imageSrc={backgroundImage}>
        <Header />
        <View style={styles.main}>
          <AuthTitle marginBottom={hp(5)} title={'비밀번호 변경'} />
          <View style={styles.mainMid}>
            <AuthTextInput
              setFunction={setOldPassword}
              width={wp(30)}
              height={hp(8)}
              size={hp(2.8)}
              text={'현재 비밀번호를 입력해주세요.'}
              secureTextEntry={true}
              marginBottom={hp(5)}
            />
            <AuthTextInput
              setFunction={setPassword}
              width={wp(30)}
              height={hp(8)}
              size={hp(2.8)}
              text={'새로운 비밀번호를 입력해주세요.'}
              secureTextEntry={true}
              marginBottom={hp(5)}
            />
            <AuthTextInput
              setFunction={setPasswordCheck}
              width={wp(30)}
              height={hp(8)}
              size={hp(2.8)}
              text={'비밀번호를 한 번 더 입력해주세요.'}
              secureTextEntry={true}
              marginBottom={hp(5)}
            />
            {password !== passwordCheck ? (
              <Text style={styles.alertMessage}>
                비밀번호가 일치하지 않습니다.
              </Text>
            ) : null}
          </View>
          <Text style={styles.infoText}>
            * 비밀번호는 대문자, 소문자, 숫자를 모두 포함한 8자리 이상으로
            구성해야 합니다
          </Text>
          <BasicButton
            text="변경 완료"
            customFontSize={hp(3.5)}
            paddingHorizon={wp(2)}
            btnWidth={wp(30)}
            btnHeight={hp(8)}
            borderRadius={14}
            onHandlePress={onHandleSubmit}
          />
        </View>
      </BackgroundAbsolute>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    minWidth: wp(40),
    minHeight: hp(75),
    paddingVertical: hp(5),
    borderRadius: 50,
    elevation: 7,
  },
  mainMid: {
    position: 'relative',
    marginBottom: hp(5),
  },
  mainText: {
    fontSize: windowWidth * 0.03125,
    fontFamily: 'NotoSansKR-Bold',
    color: '#707070',
  },
  alertMessage: {
    position: 'absolute',
    color: '#FF3120',
    fontSize: hp(2.5),
    bottom: 0,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: hp(2.5),
    color: '#707070',
    width: wp(30),
    paddingLeft: wp(1),
    marginBottom: hp(5),
  },
});

export default PassWordUpdate;
