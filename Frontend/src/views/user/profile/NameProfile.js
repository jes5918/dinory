import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Layout from '../../../components/elements/Layout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ContentTitle from '../../../components/elements/ContentTitle';
import ArrowProfileButton from '../../../components/authorization/ArrowProfileButton';
import ArrowButton from '../../../components/elements/ArrowButton';
import ProfileTextInput from '../../../components/authorization/ProfileTextInput';
import AlertModal from '../../../components/elements/AlertModal';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function NameProfile({navigation}) {
  const imageSrc = require('../../../assets/images/background2.png');
  const [fmodalVisible, setfModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Name, setName] = useState('');

  // 다음화면
  const next = () => {
    if (Name === '' || Name === null) {
      fchangeModalState();
      return;
    }

    let blank_pattern = /^\s+|\s+$/g;
    if (Name.replace(blank_pattern, '') === '') {
      fchangeModalState();
      return;
    }

    let blank_pattern2 = /[\s]/g;
    if (blank_pattern2.test(Name) === true) {
      fchangeModalState();
      return;
    }

    let special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if (special_pattern.test(Name) === true) {
      changeModalState();
      return;
    }

    navigation.navigate('AgeProfile', {
      ProfileName: Name,
    });
  };

  // 모달 상태변화
  const fchangeModalState = () => {
    setfModalVisible(!fmodalVisible);
  };

  const fcloseModal = () => {
    setTimeout(() => {
      setfModalVisible(!fmodalVisible);
    }, 1500);
  };

  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 1500);
  };

  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <View style={styles.start}>
        <View>
          <ArrowButton onHandlePress={() => navigation.goBack()} />
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../../assets/images/logo_ver2.png')}
            style={styles.logo}
          />
        </View>
      </View>
      <KeyboardAvoidingView style={styles.body} behavior={'height'}>
        <KeyboardAvoidingView style={styles.view} behavior={'height'}>
          <ContentTitle title={'이름을 입력해주세요'} />
        </KeyboardAvoidingView>
        <View>
          <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
            <ProfileTextInput
              text={'한글 또는 영어로 입력해주세요'}
              width={width * 0.375}
              height={height * 0.1}
              size={height * 0.04}
              autoFocus={false}
              setFunction={setName}
              elevation={3}
              maxLength={8}
            />
            <ArrowProfileButton
              onHandlePress={() => {
                next();
              }}
            />
            <AlertModal
              modalVisible={fmodalVisible}
              onHandleCloseModal={() => fchangeModalState()}
              text={'이름을 입력해주세요(공백 금지)'}
              iconName={'frowno'}
              color={'#FF0000'}
              setTimeFunction={() => fcloseModal()}
            />
            <AlertModal
              modalVisible={modalVisible}
              onHandleCloseModal={() => changeModalState()}
              text={'특수문자는 사용할 수 없습니다.'}
              iconName={'frowno'}
              color={'#A0A0FF'}
              setTimeFunction={() => closeModal()}
            />
          </Layout>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.end} />
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
    width: width * 0.17, //595
    height: undefined, //101
    aspectRatio: 300 / 130,
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
