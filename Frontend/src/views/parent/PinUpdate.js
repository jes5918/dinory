import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AlertModal from '../../components/elements/AlertModal';
import BasicButton from '../../components/elements/BasicButton';
import AuthTitle from '../../components/authorization/AuthTitle';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import {changePincode} from '../../api/accounts/settings';

// static variable
const backgroundImage = require('../../assets/images/background2.png');
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768

function PinUpdate() {
  const navigation = useNavigation();

  const [oldPinCode, setOldPinCode] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [pinCodeCheck, setPinCodeCheck] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [pinfailModalVisible, setPinFailModalVisible] = useState(false);
  const [pinSameModalVisible, setPinSameModalVisible] = useState(false);

  const onHandleSubmit = async () => {
    if (oldPinCode !== pinCode) {
      if (pinCode === pinCodeCheck) {
        const pinCodeForm = new FormData();
        pinCodeForm.append('old_pincode', oldPinCode);
        pinCodeForm.append('pin_code', pinCode);
        changePincode(
          pinCodeForm,
          () => {
            setModalVisible(!modalVisible);
          },
          () => {
            setFailModalVisible(!failModalVisible);
          },
        );
      } else {
        setPinFailModalVisible(!pinfailModalVisible);
      }
    } else {
      setPinSameModalVisible(!pinSameModalVisible);
    }
  };

  const closeModal = (e) => {
    if (e === 1) {
      setTimeout(() => {
        setModalVisible(!modalVisible);
        navigation.navigate('Main');
      }, 1500);
    } else if (e === 2) {
      setTimeout(() => {
        setFailModalVisible(!failModalVisible);
      }, 1500);
    } else if (e === 3) {
      setTimeout(() => {
        setPinFailModalVisible(!pinfailModalVisible);
      }, 1500);
    } else if (e === 4) {
      setTimeout(() => {
        setPinSameModalVisible(!pinSameModalVisible);
      }, 1500);
    }
  };

  const changeModalState = (e) => {
    if (e === 1) {
      setModalVisible(!modalVisible);
    } else if (e === 2) {
      setFailModalVisible(!failModalVisible);
    } else if (e === 3) {
      setPinFailModalVisible(!pinfailModalVisible);
    } else if (e === 4) {
      setPinSameModalVisible(!pinSameModalVisible);
    }
  };

  return (
    <View style={styles.container}>
      <AlertModal
        modalVisible={modalVisible}
        onHandleCloseModal={() => changeModalState(1)}
        text={'핀 번호가 변경되었습니다.'}
        iconName={'checkcircle'}
        color={'green'}
        setTimeFunction={() => closeModal(1)}
      />
      <AlertModal
        modalVisible={failModalVisible}
        onHandleCloseModal={() => changeModalState(2)}
        text={'비밀번호가 정확하지 않거나 양식에 맞지 않습니다!'}
        iconName={'exclamationcircle'}
        color={'red'}
        setTimeFunction={() => closeModal(2)}
      />
      <AlertModal
        modalVisible={pinfailModalVisible}
        onHandleCloseModal={() => changeModalState(3)}
        text={'핀 번호가 일치하지 않습니다!'}
        iconName={'exclamationcircle'}
        color={'red'}
        setTimeFunction={() => closeModal(3)}
      />
      <AlertModal
        modalVisible={pinSameModalVisible}
        onHandleCloseModal={() => changeModalState(4)}
        text={'변경할 핀 번호가 현재 핀 번호와 같습니다 '}
        iconName={'exclamationcircle'}
        color={'red'}
        setTimeFunction={() => closeModal(4)}
      />
      <BackgroundAbsolute imageSrc={backgroundImage}>
        <Header />
        <View style={styles.main}>
          <AuthTitle marginBottom={hp(5)} title={'핀 번호 변경'} />
          <View style={styles.mainMid}>
            <AuthTextInput
              setFunction={setOldPinCode}
              width={wp(30)}
              height={hp(8)}
              size={hp(2.8)}
              text={'현재 핀 번호를 입력해주세요.'}
              secureTextEntry={true}
              marginBottom={hp(5)}
              autoFocus={false}
            />
            <AuthTextInput
              setFunction={setPinCode}
              width={wp(30)}
              height={hp(8)}
              size={hp(2.8)}
              text={'새로운 핀 번호를 입력해주세요.'}
              secureTextEntry={true}
              marginBottom={hp(5)}
              autoFocus={false}
            />
            <AuthTextInput
              setFunction={setPinCodeCheck}
              width={wp(30)}
              height={hp(8)}
              size={hp(2.8)}
              text={'핀 번호를 한 번 더 입력해주세요.'}
              secureTextEntry={true}
              marginBottom={hp(5)}
              autoFocus={false}
            />
            {pinCode !== pinCodeCheck ? (
              <Text style={styles.alertMessage}>
                핀 번호가 일치하지않습니다.
              </Text>
            ) : null}
          </View>
          <Text style={styles.infoText}>
            * 핀 번호는 6자리의 숫자로 구성되어야 합니다
          </Text>
          <BasicButton
            text="변경 완료"
            customFontSize={hp(3.5)}
            paddingHorizon={wp(2)}
            btnWidth={wp(30)}
            btnHeight={hp(8)}
            borderRadius={14}
            onHandlePress={onHandleSubmit}
          />
        </View>
      </BackgroundAbsolute>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    minWidth: wp(40),
    minHeight: hp(75),
    paddingVertical: hp(5),
    borderRadius: 50,
    elevation: 7,
  },
  mainMid: {
    position: 'relative',
    marginBottom: hp(5),
  },
  mainText: {
    fontSize: windowWidth * 0.03125,
    fontFamily: 'NotoSansKR-Bold',
    color: '#707070',
  },
  alertMessage: {
    position: 'absolute',
    color: '#FF3120',
    fontSize: hp(2.5),
    bottom: 0,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: hp(2.5),
    color: '#707070',
    width: wp(30),
    paddingLeft: wp(1),
    marginBottom: hp(5),
  },
});

export default PinUpdate;
