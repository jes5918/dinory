import React, {useState, useEffect, useCallback} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../components/elements/Logo';
import Header from '../components/elements/Header';
import BackgroundAbsolute from '../components/elements/BackgroundAbsolute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
// import {didTutorial} from '../api/diary/checkTutorial';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function Main(props) {
  // 2차 배포 때 구현 예정
  // let onSound = true;
  // const stopAndPlay = () => {
  //   if (onSound) {
  //     console.log(onSound);
  //     ound.play();
  //   } else {
  //     console.log(onSound);
  //     ound.pause();
  //   }
  // };
  const url = require('../assets/images/background4.png');
  const navigation = useNavigation();
  const [child, setChild] = useState('');

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('profile').then((profile) => {
        const data = JSON.parse(profile);
        setChild(data.profile_pk);
      });
    }, []),
  );

  // 2차 배포 때 구현 예정 : 일기작성 여부에 따른 페이징 처리(작성 X : 튜토리얼 / 작성 O : 일기작성)
  // const checkDidTutorial = () => {
  //   if (didTutorial(child)) {
  //     navigation.navigate('Diary');
  //   } else {
  //     navigation.navigate('DiaryWriteTutorial');
  //   }
  // };
  const checkDidTutorial = () => {
    navigation.navigate('DiaryWriteTutorial');
  };

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={url}>
        <Header>
          <Logo />
        </Header>
        <View style={styles.innerContainer}>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.menuBtn}
              onPress={() => checkDidTutorial({child})}>
              <Text style={[styles.innerText, {color: '#ED1D9F'}]}>
                일기장 쓰기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.menuBtn}
              onPress={() => navigation.navigate('DiaryList')}>
              <Text style={[styles.innerText, {color: '#199CDC'}]}>
                일기 목록
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.menuBtn}
              onPress={() => navigation.navigate('Word')}>
              <Text style={[styles.innerText, {color: '#55E32A'}]}>단어장</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.menuBtn}
              onPress={() => navigation.navigate('SelectVoice')}>
              <Text style={[styles.innerText, {color: '#F66833'}]}>
                목소리 변경
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../assets/images/character4.png')}
            style={styles.characterImage}
          />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('MainTutorial')}>
            <MaterialIcons
              style={[
                styles.mainIcon,
                {
                  transform: [
                    {rotateX: '0deg'},
                    {rotateY: '180deg'},
                    {rotateZ: '340deg'},
                  ],
                },
              ]}
              name={'replay'}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              props.setSoundSetting(!onSound);
            }}>
            <MaterialIcons style={styles.mainIcon} name={'volume-up'} />
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ParentSetting')}>
            <MaterialIcons style={styles.mainIcon} name={'settings'} />
          </TouchableOpacity>
        </View>
      </BackgroundAbsolute>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  characterImage: {
    resizeMode: 'center',
    alignSelf: 'flex-end',
    width: width * 0.25,
    height: height * 0.4,
    marginLeft: width * 0.1,
  },
  menuBtn: {
    width: width * 0.3,
    height: 'auto',
    borderRadius: 50,
    backgroundColor: '#EEE',
    marginVertical: 8,
    paddingVertical: 20,
    elevation: 7,
  },
  innerContainer: {
    flex: 5,
    flexDirection: 'row',
    marginHorizontal: width * 0.17,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.17,
  },
  innerText: {
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: width * 0.022,
  },
  mainIcon: {
    color: '#fff',
    fontSize: width * 0.04,
    marginHorizontal: 10,
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    left: width * 0.4,
  },
});
