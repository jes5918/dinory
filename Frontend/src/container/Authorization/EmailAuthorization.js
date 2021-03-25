import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {confirmEmail} from '../../api/accounts/signup';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import ArrowButton from '../../components/elements/ArrowButton';
export default function EmailAuthorization({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.4984;
  const layoutHeight = windowHeight * 0.713;
  const [userEmail, setUserEmail] = useState('');
  const emailInputRef = React.createRef();
  const submitHandler = () => {
    let emailAuthForm = new FormData();
    emailAuthForm.append('email', userEmail);
    confirmEmail(
      emailAuthForm,
      (res) => {
        const emailAuthNumber = res.data;
        console.log(emailAuthNumber);
        alert('PASS');
      },
      (error) => {
        alert('ERROR');
        console.log(error);
      },
    );
  };
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/images/background5.png')}>
      <View style={styles.start}>
        <View>
          <ArrowButton></ArrowButton>
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}></Image>
        </View>
      </View>
      <View>
        <Layout width={layoutWidth} height={layoutHeight} opacity={1}>
          <View style={styles.view}>
            <Text style={styles.text}> 이메일 인증</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.text_Input_Button}>
              <TextInput
                style={styles.textInput}
                placeholder={'이메일을 입력하세요'}
                onChangeText={(Email) => setUserEmail(Email)}
                ref={emailInputRef}
              />
              <BasicButton
                text="중복확인"
                customFontSize={18}
                paddingHorizon={0}
                paddingVertical={11}
                btnWidth={98}
                btnHeight={58}
                borderRadius={14}
                onPressHandle={() => {
                  submitHandler();
                }}></BasicButton>
            </View>
            <View style={styles.text_Input_Button}>
              <TextInput
                placeholder={'인증코드를 입력해주세요'}
                style={styles.textInput}
              />
              <BasicButton
                text="인증"
                customFontSize={18}
                paddingHorizon={17}
                paddingVertical={16}
                btnWidth={98}
                btnHeight={58}
                borderRadius={14}
                onHandlePress={() =>
                  navigation.navigate('SignupScreen')
                }></BasicButton>
            </View>
          </View>
          <View style={styles.end}></View>
        </Layout>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 4,
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  text_Input_Button: {
    flexDirection: 'row',
    margin: 32,
  },
  textInput: {
    backgroundColor: '#E8E8E8',
    width: 389,
    height: 58,
    fontSize: 18,
    borderRadius: 10,
    marginRight: 11,
    padding: 16,
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 200 / 80,
  },
});
