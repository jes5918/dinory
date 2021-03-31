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
import DinoButton from '../../../components/elements/DinoButton';
import {createChildProfile} from '../../../api/accounts/childSettings';
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
export default function AvatarProfile({navigation}) {
  const imageSrc = require('../../../assets/images/background2.png');
  const CreateProfile = async () => {
    if (imgNumber !== 0) {
      let ProfileInfo = new FormData();
      await AsyncStorage.getItem('jwt').then((jwt) => {
        console.log('프로필에서 ', jwt);
      });
      await AsyncStorage.getItem('ProfileName').then((profileName) => {
        ProfileInfo.append('name', profileName);
      });
      await AsyncStorage.getItem('ProfileYear').then((ProfileYear) => {
        ProfileInfo.append('year', ProfileYear);
        ProfileInfo.append('img', imgNumber);
        AsyncStorage.removeItem('ProfileName');
        AsyncStorage.removeItem('ProfileYear');
      });
      console.log(ProfileInfo);
      createChildProfile(
        ProfileInfo,
        (res) => {
          console.log(res.data);
          alert('프로필이 생성되었습니다');
        },
        (error) => {
          console.log(error);
          alert('토큰이 보내지지않았습니다.');
        },
      );
      console.log(imgNumber);
      navigation.navigate('SelectProfile');
    } else {
      alert('아바타를 선택하세요');
    }
  };
  const [imgNumber, setImgNumber] = useState(0);
  const number1 = async () => {
    setImgNumber(1);
  };
  const number2 = () => {
    setImgNumber(2);
  };
  const number3 = () => {
    setImgNumber(3);
  };
  const number4 = () => {
    setImgNumber(4);
  };
  const number5 = () => {
    setImgNumber(5);
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
      <View style={styles.body}>
        <View style={styles.view}>
          <ContentTitle title={'아바타를 선택하세요'}></ContentTitle>
        </View>
        <View>
          <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
            <View style={styles.body}>
              <View style={styles.selectDino}>
                <DinoButton
                  imgSrc={require('../../../assets/images/character1.png')}
                  widthProps={width * 0.08}
                  onHandlePress={number1}
                />
                <DinoButton
                  imgSrc={require('../../../assets/images/character2.png')}
                  widthProps={width * 0.08}
                  onHandlePress={number2}
                />
                <DinoButton
                  imgSrc={require('../../../assets/images/character3.png')}
                  widthProps={width * 0.08}
                  onHandlePress={number3}
                />
                <DinoButton
                  imgSrc={require('../../../assets/images/character4.png')}
                  widthProps={width * 0.08}
                  onHandlePress={number4}
                />
                <DinoButton
                  imgSrc={require('../../../assets/images/character5.png')}
                  widthProps={width * 0.08}
                  onHandlePress={number5}
                />
              </View>
            </View>
            <View style={styles.marginBottom}>
              <ArrowProfileButton
                onHandlePress={() => {
                  CreateProfile();
                }}></ArrowProfileButton>
            </View>
          </Layout>
        </View>
      </View>
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
    zIndex: 3,
  },
  body: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  end: {
    flex: 1,
  },
  marginBottom: {
    marginBottom: 50,
  },
  selectDino: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
