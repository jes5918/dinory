import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from '../components/elements/Logo';
import Header from '../components/elements/Header';
import {useNavigation} from '@react-navigation/core';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function Main() {
  const url = require('../assets/images/background4.png');
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={url} style={styles.bgImage}>
        <Header>
          <Logo />
        </Header>
        <View style={styles.innerContainer}>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.menuBtn}
              onPress={() => navigation.navigate('WriteDiary')}>
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
          <TouchableOpacity
            activeOpacity={0.7}
            // onPress={() => }
          >
            <MaterialIcons
              style={styles.mainIcon}
              name={'volume-up'}
              // onPress={() =>}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ParentSetting')}>
            <MaterialIcons style={styles.mainIcon} name={'settings'} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'contain',
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
