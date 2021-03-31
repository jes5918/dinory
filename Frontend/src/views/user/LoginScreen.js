import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {loginInstance} from '../../api/accounts/login';
import BasicButton from '../../components/elements/BasicButton';
import Header from '../../components/elements/Header';
import AuthBackGround from '../../components/authorization/AuthBackGround';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import AuthTitle from '../../components/authorization/AuthTitle';

// static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768

export default function LoginScreen({navigation}) {
  const [checkBoxColor, setCheckBoxColor] = useState(true);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [storeId, setStoreId] = useState(false);
  const LoginHandler = async () => {
    let loginForm = new FormData();
    loginForm.append('username', userName);
    loginForm.append('password', userPassword);
    loginInstance(
      loginForm,
      (res) => {
        AsyncStorage.setItem('jwt', res.data.token);
        alert('로그인 되었습니다.');
        navigation.navigate('SelectProfile');
      },
      (error) => {
        alert('비밀번호가 잘못되었습니다');
        console.log(error);
      },
    );
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
        <View style={styles.start}>
          <View style={styles.checkOption}>
            <CheckBox
              value={autoLogin}
              onValueChange={setAutoLogin}
              style={styles.checkBox}
            />
            <Text style={styles.label}>자동 로그인</Text>
          </View>
          <View style={styles.checkOption}>
            <CheckBox
              value={storeId}
              onValueChange={setStoreId}
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
