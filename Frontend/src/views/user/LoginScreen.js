import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {loginInstance} from '../../api/accounts/login';
import BasicButton from '../../components/elements/BasicButton';
import Header from '../../components/elements/Header';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';
import {useFocusEffect} from '@react-navigation/core';
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
  const [pmodalVisible, setpModalVisible] = useState(false);

  const chkPW = (password) => {
    let cnt = 0;
    let digit = false;
    let upper = false;
    let lower = false;
    for (let index = 0; index < password.length; index++) {
      const letter = password[index];
      if (letter.isdigit && !digit) {
        cnt += 1;
      }
    }
  };
  const LoginHandler = async () => {
    // if (!chkPW(userPassword)) {
    //   return;
    // }
    chkPW(userPassword);
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
      },
    );
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
        <View style={styles.view}>
          <AuthTitle title={'로그인'} />
        </View>
        <View style={styles.view}>
          <AuthTextInput
            text={'아이디를 입력하세요'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            value={userName}
            setFunction={setUserName}
            secureTextEntry={false}
            autoFocus={false}
            marginBottom={windowHeight * 0.043}
          />
          <AuthTextInput
            text={'비밀번호를 입력해주세요'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserPassword}
            secureTextEntry={true}
            autoFocus={false}
          />
        </View>
        <View style={styles.password}>
          <Text>비밀번호를 잃어버리셨나요? </Text>
          <Text
            style={{color: 'blue'}}
            onPress={() => {
              navigation.navigate('SearchPassword');
            }}>
            비밀번호 찾기
          </Text>
        </View>
        <View style={styles.start}>
          <View style={styles.checkOption}>
            <CheckBox
              value={autoLogin}
              onValueChange={autoLoginToggle}
              style={styles.checkBox}
            />
            <Text style={styles.label}>자동 로그인</Text>
          </View>
          <View style={styles.checkOption}>
            <CheckBox
              value={storeId}
              onValueChange={setUserNameToggle}
              style={styles.checkBox}
            />
            <Text style={styles.label}>아이디 저장</Text>
          </View>
        </View>
        <View style={styles.view}>
          <BasicButton
            text="로그인"
            customFontSize={24}
            paddingHorizon={24}
            paddingVertical={11}
            btnWidth={windowWidth * 0.3}
            btnHeight={windowHeight * 0.08}
            borderRadius={14}
            margin={10}
            onHandlePress={() => LoginHandler()}
          />
        </View>
        <AlertModal
          modalVisible={modalVisible}
          onHandleCloseModal={() => changeModalState()}
          text={'로그인 되었습니다.'}
          iconName={'smileo'}
          color={'#A0A0FF'}
          setTimeFunction={() => closeModal()}
        />
        <AlertModal
          modalVisible={dmodalVisible}
          onHandleCloseModal={() => dchangeModalState()}
          text={'아이디 또는 비밀번호를 확인해주세요'}
          iconName={'frowno'}
          color={'#FF0000'}
          setTimeFunction={() => dcloseModal()}
        />
        <AlertModal
          modalVisible={pmodalVisible}
          onHandleCloseModal={() => pchangeModalState()}
          text={'비밀번호는 영어 대,소문자 + 숫자로 구성된 8자리 이상입니다!'}
          iconName={'frowno'}
          color={'#FF0000'}
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
    width: windowWidth * 0.4,
    height: windowHeight * 0.803,
    borderRadius: 30,
    elevation: 7,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  start: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: windowWidth * 0.3,
    marginTop: windowHeight * 0.043 * 2,
  },
  password: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth * 0.29,
    marginTop: windowHeight * 0.043 * 2,
  },
  label: {
    fontSize: 18,
    color: '#707070',
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
  checkOption: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: windowWidth * 0.05,
  },
  checkBox: {
    fontSize: 30,
  },
});
