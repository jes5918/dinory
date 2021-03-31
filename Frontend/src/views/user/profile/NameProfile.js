import React, {Component, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Layout from '../../../components/elements/Layout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ContentTitle from '../../../components/elements/ContentTitle';
import HoonPinkText from '../../../components/elements/HoonPinkText';
import ArrowProfileButton from '../../../components/authorization/ArrowProfileButton';
import ArrowButton from '../../../components/elements/ArrowButton';
import ProfileTextInput from '../../../components/authorization/ProfileTextInput';
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
export default function NameProfile({navigation}) {
  const imageSrc = require('../../../assets/images/background2.png');
  const [Name, setName] = useState('');
  const next = () => {
    console.log(Name);
    AsyncStorage.setItem('ProfileName', Name);
    navigation.navigate('AgeProfile');
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
          <ContentTitle title={'이름을 입력해주세요'}></ContentTitle>
        </KeyboardAvoidingView>
        <View>
          <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
            <ProfileTextInput
              text={'한글 또는 영어로 입력해주세요'}
              width={width * 0.375}
              height={height * 0.1}
              size={32}
              autoFocus={false}
              setFunction={setName}
              elevation={3}
              maxLength={12}></ProfileTextInput>
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
