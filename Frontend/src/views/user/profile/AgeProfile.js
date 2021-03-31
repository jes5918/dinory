import React, {Component, useState, createRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
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
  const [childBirth, setChildBirth] = useState('');
  const [bmodalVisible, setbModalVisible] = useState(false);
  let today = new Date();
  let year = today.getFullYear();

  const dialFunction = (data) => {
    if (childBirth.length <= 5) {
      if (data !== '지우개') {
        if (childBirth.length <= 3) {
          setChildBirth(childBirth.concat(data));
        } else {
          bchangeModalState();
        }
      } else {
        setChildBirth(childBirth.slice(0, -1));
      }
    } else {
      if (data === '지우개') {
        setChildBirth(childBirth.slice(0, -1));
      }
    }
  };
  const bchangeModalState = () => {
    setbModalVisible(!bmodalVisible);
  };
  const next = () => {
    if (childBirth >= 1990 && childBirth <= 2020) {
      console.log(childBirth);
      AsyncStorage.setItem('ProfileYear', childBirth);
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
          <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
            <View style={styles.inLine}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => [
                  setIschangeName(false),
                  setIschangeBirth(true),
                  setIschangePic(false),
                ]}>
                <View
                  style={styles.birthContainer}
                  onPress={() => [
                    setIschangeName(false),
                    setIschangeBirth(true),
                    setIschangePic(false),
                  ]}>
                  <Text style={styles.birthText}>{childBirth}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <DialButton // 민호체크
              size={width * 0.06}
              verMargin={height * 0.02}
              horMargin={width * 0.01}
              deleteSize={width * 0.04}
              inputFunc={dialFunction}
            />
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
