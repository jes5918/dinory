import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// components
import {loginInstance} from '../../api/accounts/login';
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

export default function LoginScreen({navigation}) {
  const [userName, setUserName] = useState('');
  const [storeId, setStoreId] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);

  const LoginHandler = async () => {
    if (userName.length !== 0 && userPassword.length !== 0) {
      let loginForm = new FormData();
      loginForm.append('username', userName);
      loginForm.append('password', userPassword);

      loginInstance(
        loginForm,
        async (res) => {
          if (await AsyncStorage.getItem('jwt')) {
            AsyncStorage.removeItem('jwt');
          }
          await AsyncStorage.setItem('jwt', res.data.token);
          changeModalState();
          AsyncStorage.setItem('jwt', res.data.token);
          AsyncStorage.setItem('autoUserName', userName);
          setTimeout(() => {
            navigation.navigate('SelectProfile');
          }, 1500);
        },
        (error) => {
          dchangeModalState();
          console.log(error);
        },
      );
    } else {
      dchangeModalState();
    }
  };

  const autoLoginToggle = () => {
    if (autoLogin) {
      AsyncStorage.setItem('autoLogin', 'false');
      setAutoLogin(false);
    } else {
      AsyncStorage.setItem('autoLogin', 'true');
      setAutoLogin(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('autoLogin').then((val) => {
        const temp = JSON.parse(val);
        setAutoLogin(temp);
      });
    }, []),
  );

  const setUserNameToggle = () => {
    console.log('asd', storeId);
    if (storeId) {
      AsyncStorage.setItem('autoUser', JSON.stringify(false));
      setStoreId(false);
    } else {
      AsyncStorage.setItem('autoUser', JSON.stringify(true));
      setStoreId(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('autoUser').then((val) => {
        const bool = JSON.parse(val);
        setStoreId(bool);
      });
      AsyncStorage.getItem('autoUserName')
        .then((name) => {
          setUserName(name);
        })
        .catch(() => {
          setUserName('');
        });
    }, []),
  );
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
        <AuthTitle marginBottom={hp(5)} title={'로그인'} />
        <AuthTextInput
          text={'아이디를 입력하세요'}
          width={wp(30)}
          height={hp(8)}
          size={hp(2.8)}
          value={userName}
          setFunction={setUserName}
          secureTextEntry={false}
          autoFocus={false}
          marginBottom={hp(5)}
        />
        <AuthTextInput
          text={'비밀번호를 입력해주세요'}
          width={wp(30)}
          height={hp(8)}
          size={hp(2.8)}
          setFunction={setUserPassword}
          secureTextEntry={true}
          autoFocus={false}
          marginBottom={hp(5)}
        />

        <View style={styles.optionContainer}>
          <View style={styles.optionBox}>
            <CheckBox
              tintColors={{true: '#FB537B', false: '#707070'}}
              value={autoLogin}
              onValueChange={autoLoginToggle}
            />
            <Text style={styles.optionText}>자동 로그인</Text>
          </View>
          <View style={styles.optionBox}>
            <CheckBox
              tintColors={{true: '#FB537B', false: '#707070'}}
              value={storeId}
              onValueChange={setUserNameToggle}
            />
            <Text style={styles.optionText}>아이디 저장</Text>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.infoText, {color: 'grey'}]}>
            비밀번호를 잃어버리셨나요?{' '}
          </Text>
          <Text
            style={[styles.infoText, {color: 'blue'}]}
            onPress={() => {
              navigation.navigate('SearchPassword');
            }}>
            비밀번호 찾기
          </Text>
        </View>
        <BasicButton
          text="로그인"
          customFontSize={hp(3.5)}
          paddingHorizon={wp(2)}
          paddingVertical={hp(5)}
          btnWidth={wp(30)}
          btnHeight={hp(8)}
          borderRadius={14}
          onHandlePress={() => LoginHandler()}
        />
        <AlertModal
          modalVisible={modalVisible}
          onHandleCloseModal={() => changeModalState()}
          text={'로그인 되었습니다.'}
          iconName={'smileo'}
          color={'green'}
          setTimeFunction={() => closeModal()}
        />
        <AlertModal
          modalVisible={dmodalVisible}
          onHandleCloseModal={() => dchangeModalState()}
          text={'아이디 또는 비밀번호를 확인해주세요'}
          iconName={'frowno'}
          color={'red'}
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
    minWidth: wp(40),
    minHeight: hp(78),
    borderRadius: 30,
    elevation: 7,
    paddingVertical: hp(5),
  },
  infoText: {
    fontSize: hp(2.5),
    marginTop: hp(5),
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: wp(30),
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(30),
    marginBottom: hp(3),
  },
  optionText: {
    fontSize: hp(2.8),
    color: '#707070',
  },
  text: {},
  optionBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(5),
  },
});
