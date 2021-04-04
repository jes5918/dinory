import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// components
import {duflicationCheckID} from '../../api/accounts/signup';
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

export default function SingupSCreen({navigation, route}) {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordchk, setUserPasswordchk] = useState('');
  const [idAvailable, setIdAvailable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [bmodalVisible, setbModalVisible] = useState(false);
  const [cmodalVisible, setcModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);
  const [pmodalVisible, setpModalVisible] = useState(false);
  const user_email = route.params.email;
  const idCheck = () => {
    let idCheckForm = new FormData();
    idCheckForm.append('username', userName);
    duflicationCheckID(
      idCheckForm,
      (res) => {
        const idcheck = res.data;
        setIdAvailable(true);
        changeModalState();
      },
      (error) => {
        dchangeModalState();
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
  const SubmitHandler = () => {
    if (idAvailable) {
      if (userPassword === userPasswordchk) {
        if (!chkPW(userPassword)) {
          pchangeModalState();
          return;
        }
        navigation.navigate('PinScreen', {
          userInfo: {
            user_email: user_email,
            user_name: userName,
            user_Pass: userPassword,
            user_Passchk: userPasswordchk,
          },
        });
      } else {
        bchangeModalState();
      }
    } else {
      cchangeModalState();
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
    }, 2000);
  };
  const cchangeModalState = () => {
    setcModalVisible(!cmodalVisible);
  };
  const pcloseModal = () => {
    setTimeout(() => {
      setpModalVisible(!pmodalVisible);
    }, 2000);
  };
  const pchangeModalState = () => {
    setpModalVisible(!pmodalVisible);
  };
  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.container}>
        <AuthTitle marginBottom={hp(5)} title={'회원가입'} />
        <View style={styles.body}>
          <View style={styles.text_Input_Button}>
            <AuthTextInput
              marginBottom={hp(5)}
              text={'아이디를 입력해주세요'}
              width={wp(28)}
              height={hp(8)}
              size={hp(2.8)}
              setFunction={setUserName}
              secureTextEntry={false}
              autoFocus={false}
            />

            <BasicButton
              text="중복확인"
              customFontSize={hp(2.8)}
              paddingHorizon={0}
              paddingVertical={16}
              btnWidth={wp(9)}
              btnHeight={hp(8)}
              borderRadius={14}
              onHandlePress={() => idCheck()}
            />
          </View>
          <AuthTextInput
            marginBottom={windowHeight * 0.02}
            text={'비밀번호를 입력해주세요'}
            width={wp(38)}
            height={hp(8)}
            size={hp(2.8)}
            setFunction={setUserPassword}
            secureTextEntry={true}
            autoFocus={false}
          />
          <Text style={styles.text_Pin}>
            * 비밀번호는 대소문자(영어), 숫자 조합 8자리 이상으로 구성해야
            합니다
          </Text>
          <AuthTextInput
            marginBottom={hp(5)}
            text={'비밀번호를 한 번 더 입력해주세요'}
            width={wp(38)}
            height={hp(8)}
            size={hp(2.8)}
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
            customFontSize={hp(3.5)}
            paddingHorizon={wp(2)}
            paddingVertical={hp(3)}
            btnWidth={wp(38)}
            btnHeight={hp(8)}
            borderRadius={14}
            onHandlePress={() => SubmitHandler()}
          />
        </View>
        <AlertModal
          modalVisible={modalVisible}
          onHandleCloseModal={() => changeModalState()}
          text={'사용가능한 아이디입니다.'}
          iconName={'smileo'}
          color={'green'}
          setTimeFunction={() => closeModal()}
        />
        <AlertModal
          modalVisible={dmodalVisible}
          onHandleCloseModal={() => dchangeModalState()}
          text={'존재하는 아이디입니다.'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => dcloseModal()}
        />
        <AlertModal
          modalVisible={bmodalVisible}
          onHandleCloseModal={() => bchangeModalState()}
          text={'비밀번호가 일치하지않습니다.'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => bcloseModal()}
        />
        <AlertModal
          modalVisible={cmodalVisible}
          onHandleCloseModal={() => cchangeModalState()}
          text={'아이디 중복확인을 해주세요!'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => ccloseModal()}
        />
        <AlertModal
          modalVisible={pmodalVisible}
          onHandleCloseModal={() => pchangeModalState()}
          text={'비밀번호는 영어 대,소문자 + 숫자로 구성된 8자리 이상입니다!'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => pcloseModal()}
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
    minWidth: wp(50),
    minHeight: hp(80),
    borderRadius: 30,
    elevation: 7,
    paddingVertical: hp('5%'),
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.043 * 2,
    marginBottom: windowHeight * 0.043 * 2,
  },
  viewBottom: {
    marginTop: windowHeight * 0.03,
    marginBottom: windowHeight * 0.043,
  },
  text_Input_Button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.38,
    position: 'relative',
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
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
});
