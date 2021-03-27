import React, {Component, useState, createRef} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {confirmEmail} from '../../api/accounts/signup';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import ArrowButton from '../../components/elements/ArrowButton';
export default function PinCreate({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.3718;
  const layoutHeight = windowHeight * 0.755;
  const [userPinNumber, setUserPinNumber] = useState('');
  const [userPinNumberchk, setUserPinNumberchk] = useState('');
  const pinnumberInputRef = createRef();
  const pinnumberchkInputRef = createRef();
  const submitHandler = () => {
    let pinAuthForm = new FormData();
    pinAuthForm.append('email', userPinNumber);
    confirmEmail(
      pinAuthForm,
      (res) => {
        const pinAuthNumber = res.data;
        console.log(pinAuthNumber);
        alert('PASS');
        navigation.navigate('LoginScreen');
      },
      (error) => {
        alert('ERROR');
        console.log(error);
      },
    );
  };
  return (
    <ScrollView>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/images/background5.png')}>
        <View style={styles.start}>
          <View>
            <ArrowButton
              onHandlePress={() => navigation.goBack()}></ArrowButton>
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
              <Text style={styles.text}> 핀 번호 생성</Text>
            </View>
            <View style={styles.body}>
              <View style={styles.view}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'핀 번호 숫자 6자리를 입력해주세요'}
                  onChangeText={(Pin) => setUserPinNumber(Pin)}
                  secureTextEntry={true}
                  autoFocus={true}
                  ref={pinnumberInputRef}
                />
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={true}
                  placeholder={'한 번 더 입력해주세요.'}
                  onChangeText={(Pinchk) => setUserPinNumberchk(Pinchk)}
                  ref={pinnumberchkInputRef}
                />
                <View
                  style={{
                    flex: 0.5,
                    justifyContent: 'flex-start',
                  }}>
                  {userPinNumber !== userPinNumberchk ? (
                    <Text>핀 번호가 일치하지 않습니다.</Text>
                  ) : null}
                </View>
                <Text style={styles.text_Pin}>
                  * 핀 번호는 프로필 추가, 변경,삭제 시에 활용합니다.
                </Text>
                <View style={styles.view}>
                  <BasicButton
                    text="완료"
                    customFontSize={24}
                    paddingHorizon={0}
                    paddingVertical={11}
                    btnWidth={336}
                    btnHeight={73}
                    borderRadius={14}
                    onHandlePress={() => {
                      submitHandler();
                    }}></BasicButton>
                </View>
              </View>
            </View>
          </Layout>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#707070',
  },
  text_Pin: {
    fontSize: 18,
    width: 326,
    // fontWeight: 'bold',
    color: '#707070',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  start: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 4,
    // margin: 30,
    textAlign: 'center',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#E8E8E8',
    width: 326,
    height: 58,
    fontSize: 18,
    borderRadius: 14,
    margin: 15,
    padding: 16,
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
});
