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
import Profile from '../components/elements/Profile';
import ArrowButton from '../components/elements/ArrowButton';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function Main() {
  const url = require('../assets/images/background4.png');
  // const {navigate} = props.navigation;

  return (
    <View style={styles.container}>
      <ImageBackground source={url} style={styles.bgImage}>
        <View style={styles.header}>
          <ArrowButton />
          <Logo />
          <Profile />
        </View>
        <View style={styles.innerContainer}>
          <View>
            <TouchableOpacity activeOpacity={0.5} style={styles.menuBtn}>
              <Text style={[styles.innerText, {color: '#ED1D9F'}]}>
                일기장 쓰기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={styles.menuBtn}>
              <Text style={[styles.innerText, {color: '#199CDC'}]}>
                일기 목록
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={styles.menuBtn}>
              <Text style={[styles.innerText, {color: '#55E32A'}]}>단어장</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={styles.menuBtn}>
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
          <TouchableOpacity activeOpacity={0.5}>
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
          <TouchableOpacity activeOpacity={0.5}>
            <MaterialIcons style={styles.mainIcon} name={'volume-up'} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
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
  header: {
    display: 'flex',
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 6,
    },
    shadowOpacity: 0.32,
    shadowRadius: 3,
    elevation: 15,
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
