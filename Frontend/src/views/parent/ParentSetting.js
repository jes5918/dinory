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
import AlertModal from '../../components/elements/AlertModal';

// static variable
const url = require('../../assets/images/background2.png');
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752
const AsyncStorageKeys = [
  'jwt',
  'email',
  'username',
  'password',
  'password_confirmation',
  'pin_code',
  'pin_code_confirmation',
  'ProfileYear',
  'ProfileName',
];
let presentKeys = [];

function ParentSetting() {
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInfoModal, setUpdateInfoModal] = useState(false);
  const navigation = useNavigation();

  const getAllKeys = async () => {
    try {
      presentKeys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.error('AsyncStorage getAllKeys Fail : ', e);
    }

    console.log('AsyncStorage getAllKeys Done : ', presentKeys);
  };

  const removeFew = async () => {
    const willRemovedKeys = presentKeys.filter((key) =>
      AsyncStorageKeys.includes(key),
    );
    console.log(willRemovedKeys);
    try {
      setModalVisible(!modalVisible);
      await AsyncStorage.multiRemove(willRemovedKeys);
      navigation.navigate('HomeScreen');
    } catch (e) {
      console.log('AsyncStorage Remove Keys Fail : ', e);
    }

    console.log('AsyncStorage Remove Keys Done');
  };

  const onHandleProfileDelete = () => {
    alert('프로필을 삭제하시겠습니까?');
  };

  const onHandlePressAllow = async () => {
    await getAllKeys();
    await removeFew();
  };

  const onHandleLogout = () => {
    setModalVisible(!modalVisible);
  };

  const onHandlePressRefuse = () => {
    setModalVisible(!modalVisible);
  };

  const changeModalState = () => {
    setUpdateInfoModal(!updateInfoModal);
  };

  const closeModal = () => {
    setTimeout(() => {
      setUpdateInfoModal(!updateInfoModal);
    }, 1000);
  };

  const willUpdateInfomation = () => {
    setUpdateInfoModal(!updateInfoModal);
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
        secondText={'자동 로그인을 한 경우, 해제됩니다.'}
      />
      <AlertModal
        modalVisible={updateInfoModal}
        onHandleCloseModal={() => changeModalState()}
        text={'현재 준비중인 기능입니다.'}
        iconName={'warning'}
        color={'#ffcc00'}
        setTimeFunction={() => closeModal()}
      />
      <BackgroundAbsolute style={styles.container} imageSrc={url}>
        <Header />
        <Layout
          style={styles.mainContainer}
          width={windowWidth * 0.336}
          height={windowHeight * 0.8}
          opacity={1}>
          <TouchableOpacity
            onPress={() => willUpdateInfomation()}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>일기 검사하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => willUpdateInfomation()}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>통계 보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PinAuthentication', {
                connetedRoute: 'PinUpdate',
              })
            }
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>핀 번호 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PinAuthentication', {
                connetedRoute: 'PassWordUpdate',
              })
            }
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
    paddingVertical: windowHeight * 0.032,
  },
  mainText: {
    color: '#707070',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: windowWidth * 0.01875,
    textAlign: 'center',
  },
});

export default ParentSetting;
