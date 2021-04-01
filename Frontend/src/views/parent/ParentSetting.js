import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeChildProfile} from '../../api/accounts/childSettings';

// components
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

// 현재 스토리지에 있는 키
// ['jwt', 'user_pk', 'profile'];

function ParentSetting({route}) {
  const {profilePK} = route.params;
  const [logoutModal, setLogoutModal] = useState(false);
  const [profileDelete, setProfileDelete] = useState(false);
  const [updateInfoModal, setUpdateInfoModal] = useState(false);
  const [logoutInfoModal, setLogoutInfoModal] = useState(false);
  const [profileDeleteInfoModal, setProfileDeleteInfoModal] = useState(false);
  const navigation = useNavigation();

  const executeLogout = async () => {
    const willRemovedKeys = ['jwt', 'profile', 'autoLogin'];

    try {
      setLogoutModal(!logoutModal);
      await AsyncStorage.multiRemove(willRemovedKeys);
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    } catch (e) {
      console.log('AsyncStorage Remove Keys Fail : ', e);
    }

    console.log(
      'AsyncStorage Remove Keys Done(다음 키들을 삭제했습니다.) : ',
      willRemovedKeys,
    );
  };

  const deleteProfile = async () => {
    const willRemovedKeys = ['profile'];

    try {
      setProfileDelete(!profileDelete);
      await AsyncStorage.multiRemove(willRemovedKeys);
      navigation.navigate('SelectProfile'); // 프로필이 아예 없는 경우의 로직 구현 필요
    } catch (e) {
      console.log('AsyncStorage Remove Keys Fail : ', e);
    }

    console.log(
      'AsyncStorage Remove Keys Done(다음 키들을 삭제했습니다.) : ',
      willRemovedKeys,
    );
  };

  const fetchRemoveProfile = async () => {
    if (profilePK) {
      removeChildProfile(
        profilePK,
        (res) => {
          console.log('프로필이 정상적으로 삭제되었습니다.');
        },
        (e) => {
          console.error('프로필 삭제에서 에러가 발생했습니다. : ', e);
        },
      );
    } else {
      console.error(
        '문제: AsyncStorage에서 프로필 ID를 못 불러왔습니다.(ParentSetting.js를 확인해주세요.)',
      );
    }
  };

  // ===========================================>
  // 프로필 삭제
  const onHandleProfileDelete = () => {
    setProfileDelete(!profileDelete);
  };

  const onHandlePressAllowProfileDelete = async () => {
    await fetchRemoveProfile();
    await deleteProfile();
  };

  const onHandlePressRefuseProfileDelete = () => {
    setProfileDelete(!profileDelete);
  };
  // <===========================================

  // ===========================================>
  // 로그아웃
  const onHandleLogout = () => {
    setLogoutModal(!logoutModal);
  };

  const onHandlePressAllowLogout = async () => {
    await executeLogout();
  };

  const onHandlePressRefuseLogout = () => {
    setLogoutModal(!logoutModal);
  };
  // <===========================================

  // ===========================================>
  // 준비중인 기능에 대한 안내.
  const willUpdateInfomationTimeModal = () => {
    setTimeout(() => {
      setUpdateInfoModal(!updateInfoModal);
    }, 1000);
  };

  const willUpdateInfomationCloseModal = () => {
    setUpdateInfoModal(!updateInfoModal);
  };
  // <===========================================

  // ===========================================>
  // 로그아웃 완료에 대한 안내.
  const logoutCompleteInfomationTimeModal = () => {
    setTimeout(() => {
      setLogoutInfoModal(!logoutInfoModal);
    }, 1000);
  };

  const logoutCompleteInfomationCloseModal = () => {
    setLogoutInfoModal(!logoutInfoModal);
  };
  // <===========================================

  // ===========================================>
  // 프로필 삭제 완료에 대한 안내.
  const profileDeleteInfomationTimeModal = () => {
    setTimeout(() => {
      setProfileDeleteInfoModal(!profileDeleteInfoModal);
    }, 1000);
  };

  const profileDeleteInfomationCloseModal = () => {
    setProfileDeleteInfoModal(!profileDeleteInfoModal);
  };
  // <===========================================

  return (
    <View style={styles.container}>
      <SelectModal
        modalVisible={logoutModal}
        alertText={'정말 로그아웃 하시겠습니까?'}
        refuseText={'취소'}
        allowText={'로그아웃'}
        onHandlePressAllow={onHandlePressAllowLogout}
        onHandlePressRefuse={onHandlePressRefuseLogout}
        secondText={'자동 로그인을 한 경우, 해제됩니다.'}
      />
      <SelectModal
        modalVisible={profileDelete}
        alertText={'해당 프로필을 지우시겠습니까?'}
        refuseText={'취소'}
        allowText={'삭제하기'}
        onHandlePressAllow={onHandlePressAllowProfileDelete}
        onHandlePressRefuse={onHandlePressRefuseProfileDelete}
        secondText={'프로필의 모든 데이터가 삭제됩니다.'}
      />
      <AlertModal
        modalVisible={updateInfoModal}
        onHandleCloseModal={() => willUpdateInfomationCloseModal()}
        text={'현재 준비중인 기능입니다.'}
        iconName={'warning'}
        color={'#ffcc00'}
        setTimeFunction={() => willUpdateInfomationTimeModal()}
      />
      <AlertModal
        modalVisible={logoutInfoModal}
        onHandleCloseModal={() => logoutCompleteInfomationCloseModal()}
        text={'로그아웃이 완료되었습니다.'}
        iconName={'warning'}
        color={'#ffcc00'}
        setTimeFunction={() => logoutCompleteInfomationTimeModal()}
      />
      <AlertModal
        modalVisible={profileDeleteInfoModal}
        onHandleCloseModal={() => profileDeleteInfomationCloseModal()}
        text={'프로필이 삭제되었습니다.'}
        iconName={'warning'}
        color={'#ffcc00'}
        setTimeFunction={() => profileDeleteInfomationTimeModal()}
      />
      <BackgroundAbsolute imageSrc={url}>
        <Header />
        <Layout
          style={styles.mainContainer}
          width={windowWidth * 0.336}
          height={windowHeight * 0.8}
          opacity={1}>
          <TouchableOpacity
            onPress={() => willUpdateInfomationCloseModal()}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>일기 검사하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => willUpdateInfomationCloseModal()}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>통계 보기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PinUpdate')}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>핀 번호 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('PassWordUpdate')}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>비밀번호 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectProfile')}
            activeOpacity={0.7}
            style={styles.mainButton}>
            <Text style={styles.mainText}>다른 프로필로 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onHandleProfileDelete()}
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
    paddingVertical: windowHeight * 0.026,
  },
  mainText: {
    color: '#707070',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: windowWidth * 0.01875,
    textAlign: 'center',
  },
});

export default ParentSetting;
