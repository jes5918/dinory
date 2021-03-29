import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import Layout from '../../components/elements/Layout';
import {useNavigation} from '@react-navigation/core';

// static variable
const url = require('../../assets/images/background3.png');

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752

function ParentSetting() {
  const navigation = useNavigation();

  const onHandleProfileDelete = () => {
    alert('프로필을 삭제하시겠습니까?');
  };

  return (
    <View style={styles.container}>
      <BackgroundAbsolute style={styles.container} imageSrc={url}>
        <Header />
        <Layout
          style={styles.mainContainer}
          width={windowWidth * 0.336}
          height={windowHeight * 0.67}
          opacity={1}>
          <TouchableOpacity
            onPress={() => console.log('clicked')}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>일기 검사하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('clicked')}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>통계 보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('clicked')}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>핀 번호 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('clicked')}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>비밀번호 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('clicked')}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={[styles.mainText, {color: '#FF3120'}]}>
              프로필 삭제
            </Text>
          </TouchableOpacity>
        </Layout>
      </BackgroundAbsolute>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: windowHeight * 0.027,
    elevation: 7,
  },
  mainButton: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.05,
    marginVertical: windowHeight * 0.037,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  mainText: {
    color: '#707070',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: windowWidth * 0.01875,
    textAlign: 'center',
  },
});

export default ParentSetting;
