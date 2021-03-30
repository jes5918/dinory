import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import Layout from '../../components/elements/Layout';
import SelectModal from '../../components/elements/SelectModal';

// static variable
const url = require('../../assets/images/background2.png');
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752

function ParentSetting() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const onHandleProfileDelete = () => {
    alert('프로필을 삭제하시겠습니까?');
  };

  const onHandleLogout = () => {
    setModalVisible(!modalVisible);
  };

  const clearAll = async () => {
    try {
      setModalVisible(!modalVisible);
      await AsyncStorage.clear();
      navigation.navigate('HomeScreen');
    } catch (e) {
      // clear error
      console.error('AsyncStorage Clear Fail : ', e);
    }

    console.log('AsyncStorage Clear Done.');
  };

  const onHandlePressAllow = () => {
    clearAll();
  };

  const onHandlePressRefuse = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <SelectModal
        modalVisible={modalVisible}
        alertText={'정말 로그아웃 하시겠습니까?'}
        refuseText={'취소'}
        allowText={'로그아웃'}
        onHandlePressAllow={onHandlePressAllow}
        onHandlePressRefuse={onHandlePressRefuse}
      />
      <BackgroundAbsolute style={styles.container} imageSrc={url}>
        <Header />
        <Layout
          style={styles.mainContainer}
          width={windowWidth * 0.336}
          height={windowHeight * 0.8}
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
            onPress={() => navigation.push('PinUpdate')}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>핀 번호 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.push('PassWordUpdate')}
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
          <TouchableOpacity
            onPress={() => onHandleLogout()}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={[styles.mainText, {color: '#FF3120'}]}>로그아웃</Text>
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
    width: '100%',
    height: windowHeight * 0.05,
    marginVertical: windowHeight * 0.03,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  mainText: {
    color: '#707070',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: windowWidth * 0.01875,
    textAlign: 'center',
  },
});

export default ParentSetting;
