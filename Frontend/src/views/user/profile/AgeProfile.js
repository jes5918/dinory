import React, {Component, useState, createRef} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import Layout from '../../../components/elements/Layout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ContentTitle from '../../../components/elements/ContentTitle';
import HoonPinkText from '../../../components/elements/HoonPinkText';
import ArrowProfileButton from '../../../components/authorization/ArrowProfileButton';
import ArrowButton from '../../../components/elements/ArrowButton';
import ProfileTextInput from '../../../components/authorization/ProfileTextInput';
import DialButton from '../../../components/elements/DialButton';
ageInputRef = createRef();
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function AgeProfile({navigation}) {
  const imageSrc = require('../../../assets/images/background2.png');
  const [year, setYear] = useState('');
  const next = () => {
    if (year >= 1990 && year <= 2020) {
      console.log(year);
      AsyncStorage.setItem('ProfileYear', year);
      navigation.navigate('AvatarProfile');
    } else {
      alert('올바른 연도가 아닙니다');
    }
  };
  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <View style={styles.start}>
        <View>
          <ArrowButton onHandlePress={() => navigation.goBack()}></ArrowButton>
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}></Image>
        </View>
      </View>
      <KeyboardAvoidingView style={styles.body} behavior={'height'}>
        <KeyboardAvoidingView style={styles.view} behavior={'height'}>
          <ContentTitle title={'태어난 연도를 선택해주세요'}></ContentTitle>
        </KeyboardAvoidingView>
        <View>
          <TextInput ref={ageInputRef}></TextInput>
          <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
            <ProfileTextInput
              text={'숫자 4자리를 입력해주세요'}
              width={width * 0.375}
              height={height * 0.1}
              size={32}
              autoFocus={false}
              setFunction={setYear}
              elevation={3}></ProfileTextInput>
            <DialButton childName={'1'}></DialButton>
            <ArrowProfileButton
              onHandlePress={() => {
                next();
              }}></ArrowProfileButton>
          </Layout>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.end}></View>
    </BackgroundAbsolute>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    flex: 1.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
  view: {
    marginBottom: 26,
  },
  body: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  end: {
    flex: 1,
  },
});
