import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Layout from '../../../components/elements/Layout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ContentTitle from '../../../components/elements/ContentTitle';
import RoundButton from '../../../components/elements/RoundButton';
import ProfileTextInput from '../../../components/authorization/ProfileTextInput';
import Header from '../../../components/elements/Header';
import AlertModal from '../../../components/elements/AlertModal';
import {checkProfileName} from '../../../api/accounts/childSettings';
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function NameProfile({navigation}) {
  const imageSrc = require('../../../assets/images/background2.png');
  const [fmodalVisible, setfModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Name, setName] = useState('');
  const [emodalVisible, seteModalVisible] = useState(false);

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
    let number_pattern = /[0-9]/g;
    if (number_pattern.test(Name) === true) {
      changeModalState();
      return;
    }

    let special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if (special_pattern.test(Name) === true) {
      changeModalState();
      return;
    }
    let ProfileName = new FormData();
    ProfileName.append('name', Name);
    checkProfileName(
      ProfileName,
      (res) => {
        navigation.navigate('AgeProfile', {
          ProfileName: Name,
        });
      },
      (error) => {
        echangeModalState();
      },
    );
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
  const ecloseModal = () => {
    setTimeout(() => {
      seteModalVisible(!emodalVisible);
    }, 2000);
  };

  const echangeModalState = () => {
    seteModalVisible(!emodalVisible);
  };
  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <Header logoHeader={true} />
      <View style={styles.body}>
        <ContentTitle title={'이름을 입력해주세요'} />
        <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
          <ProfileTextInput
            text={'한글 또는 영어로 입력해주세요.'}
            width={width * 0.375}
            height={height * 0.1}
            size={height * 0.042}
            autoFocus={false}
            setFunction={setName}
            elevation={3}
            maxLength={8}
            marginBottom={height * 0.15}
          />
          <RoundButton
            arrow={true}
            onHandlePress={() => {
              next();
            }}
          />
          <AlertModal
            modalVisible={fmodalVisible}
            onHandleCloseModal={() => fchangeModalState()}
            text={'이름을 입력해주세요(공백 금지)'}
            iconName={'frowno'}
            color={'red'}
            setTimeFunction={() => fcloseModal()}
          />
          <AlertModal
            modalVisible={modalVisible}
            onHandleCloseModal={() => changeModalState()}
            text={'숫자 또는 특수문자는 사용할 수 없습니다.'}
            iconName={'frowno'}
            color={'red'}
            setTimeFunction={() => closeModal()}
          />
          <AlertModal
            modalVisible={emodalVisible}
            onHandleCloseModal={() => echangeModalState()}
            text={'이미 등록된 프로필이 존재합니다!'}
            iconName={'frowno'}
            color={'red'}
            setTimeFunction={() => ecloseModal()}
          />
        </Layout>
      </View>
    </BackgroundAbsolute>
  );
}
const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.14,
  },
});
