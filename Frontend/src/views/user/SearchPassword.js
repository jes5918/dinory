import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {sendEmailForPW, confirmEmailForPW} from '../../api/accounts/login';
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

export default function SearchPassword({navigation}) {
  const [userWriteEmail, setUserWriteEmail] = useState('');
  const [userWriteName, setUserWriteName] = useState('');
  const [userTicket, setUserTicket] = useState('');
  const [codeInputState, setCodeInputState] = useState(false);
  const [VisibleState, setVisibleState] = useState(true);
  const [userWriteCode, setUserWriteCode] = useState('');
  const [fmodalVisible, setfModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);
  const [emodalVisible, seteModalVisible] = useState(false);
  const AuthenticateEmail = async () => {
    if (userWriteEmail.length > 0 && userWriteName.length > 0) {
      let PasswordForm = new FormData();
      PasswordForm.append('email', userWriteEmail);
      PasswordForm.append('username', userWriteName);
      sendEmailForPW(
        PasswordForm,
        (res) => {
          setUserTicket(res.data.id);
          setVisibleState(false);
          setCodeInputState(true);
        },
        (error) => {
          fchangeModalState();
        },
      );
    } else {
      echangeModalState();
    }
  };
  const AuthenticateCode = () => {
    let CodeForm = new FormData();
    CodeForm.append('email', userWriteEmail);
    CodeForm.append('code', userWriteCode);
    CodeForm.append('id', userTicket);
    confirmEmailForPW(
      CodeForm,
      (res) => {
        navigation.navigate('ModifyPassword', {user_ID: res.data.user});
      },
      (error) => {
        dchangeModalState();
      },
    );
  };
  const fcloseModal = () => {
    setTimeout(() => {
      setfModalVisible(!fmodalVisible);
    }, 2000);
  };
  const fchangeModalState = () => {
    setfModalVisible(!fmodalVisible);
  };
  const dcloseModal = () => {
    setTimeout(() => {
      setdModalVisible(!dmodalVisible);
    }, 2000);
  };
  const dchangeModalState = () => {
    setdModalVisible(!dmodalVisible);
  };
  const ecloseModal = () => {
    setTimeout(() => {
      seteModalVisible(!emodalVisible);
    }, 2000);
  };
  const echangeModalState = () => {
    seteModalVisible(!emodalVisible);
  };
  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.container}>
        <View style={styles.view}>
          <AuthTitle title={'비밀번호 찾기'} />
        </View>
        <View style={styles.view}>
          <AuthTextInput
            text={'이메일을 입력하세요'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserWriteEmail}
            secureTextEntry={false}
            autoFocus={false}
            marginBottom={windowHeight * 0.043}
          />
          <AuthTextInput
            text={'아이디를 입력해주세요'}
            width={windowWidth * 0.3}
            height={windowHeight * 0.08}
            size={18}
            setFunction={setUserWriteName}
            secureTextEntry={false}
            autoFocus={false}
          />
        </View>
        {VisibleState ? (
          <View style={styles.view}>
            <BasicButton
              text="본인인증"
              customFontSize={24}
              paddingHorizon={24}
              paddingVertical={11}
              btnWidth={windowWidth * 0.3}
              btnHeight={windowHeight * 0.08}
              borderRadius={14}
              margin={10}
              onHandlePress={() => AuthenticateEmail()}
            />
          </View>
        ) : null}
        {codeInputState ? (
          <View style={styles.view}>
            <AuthTextInput
              text={'인증코드를 입력해주세요'}
              width={windowWidth * 0.3}
              height={windowHeight * 0.08}
              size={18}
              setFunction={setUserWriteCode}
              secureTextEntry={true}
              autoFocus={false}
            />
            <BasicButton
              text="확인"
              customFontSize={24}
              paddingHorizon={24}
              paddingVertical={11}
              btnWidth={windowWidth * 0.3}
              btnHeight={windowHeight * 0.08}
              borderRadius={14}
              margin={windowHeight * 0.04}
              onHandlePress={() => AuthenticateCode()}
            />
          </View>
        ) : null}
        <AlertModal
          modalVisible={fmodalVisible}
          onHandleCloseModal={() => fchangeModalState()}
          text={'등록된 회원정보가 없습니다!'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => fcloseModal()}
        />
        <AlertModal
          modalVisible={dmodalVisible}
          onHandleCloseModal={() => dchangeModalState()}
          text={'인증코드가 틀렸습니다!'}
          iconName={'frowno'}
          color={'red'}
          setTimeFunction={() => dcloseModal()}
        />
        <AlertModal
          modalVisible={emodalVisible}
          onHandleCloseModal={() => echangeModalState()}
          text={'이메일과 아이디를 모두 작성해주세요!'}
          iconName={'frowno'}
          color={'#FF0000'}
          setTimeFunction={() => ecloseModal()}
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
    fontFamily: 'NotoSansKR-Bold',
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
    fontFamily: 'NotoSansKR-Bold',
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
