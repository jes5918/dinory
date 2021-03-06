import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// components
import AlertModal from '../../components/elements/AlertModal';
import BasicButton from '../../components/elements/BasicButton';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import AuthTextInput from '../../components/authorization/AuthTextInput';
import {checkPincode} from '../../api/accounts/settings';

// static variable
const backgroundImage = require('../../assets/images/background2.png');
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280
const windowHeight = windowSize.height; // 768
const inputWidth = windowWidth * 0.2625;
const inputHeight = windowHeight * 0.077;

function PinAuthentication({route}) {
  const {connetedRoute, profilePK} = route.params;
  const navigation = useNavigation();

  const [pinCode, setPinCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertForEnter, setAlertForEnter] = useState(false);

  const onHandleSubmit = async () => {
    // validation
    // isNaN : 숫자인지 확인(타입 상관 없이)
    if (pinCode.length < 6 || isNaN(pinCode)) {
      setAlertForEnter(true);
      return;
    } else {
      setAlertForEnter(false);
    }

    const pinInfo = new FormData();
    pinInfo.append('pin_code', pinCode);
    checkPincode(
      pinInfo,
      () => {
        setModalVisible(!modalVisible);
      },
      () => {
        setAlertForEnter(!alertForEnter);
      },
    );
  };

  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };

  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
      navigation.navigate(connetedRoute, {profilePK: profilePK});
    }, 1500);
  };

  const changeModalStateForEnter = () => {
    setAlertForEnter(!alertForEnter);
  };

  const closeModalForEnter = () => {
    setTimeout(() => {
      setAlertForEnter(!alertForEnter);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <AlertModal
        modalVisible={alertForEnter}
        onHandleCloseModal={() => changeModalStateForEnter()}
        text={'핀 번호를 정확히 입력해주세요.'}
        iconName={'exclamationcircle'}
        color={'red'}
        setTimeFunction={() => closeModalForEnter()}
      />
      <AlertModal
        modalVisible={modalVisible}
        onHandleCloseModal={() => changeModalState()}
        text={'인증되었습니다.'}
        iconName={'checkcircle'}
        color={'green'}
        setTimeFunction={() => closeModal()}
      />
      <BackgroundAbsolute imageSrc={backgroundImage}>
        <Header />
        <View style={styles.main}>
          <View style={styles.mainTop}>
            <Text style={styles.mainText}>핀 번호 인증</Text>
          </View>
          <View style={styles.mainMid}>
            <AuthTextInput
              setFunction={setPinCode}
              width={wp(30)}
              height={hp(8)}
              size={hp(2.8)}
              text={'핀 번호를 입력하세요.'}
              secureTextEntry={true}
            />
            <Text style={styles.infoText}>
              * 핀 번호는 6자리의 숫자로 구성됩니다.
            </Text>
          </View>
          <View style={styles.mainBot}>
            <BasicButton
              text="인증"
              customFontSize={windowWidth * 0.01875} // 24
              btnWidth={wp(30)} // 336
              btnHeight={hp(8)} // 58
              borderRadius={14}
              onHandlePress={onHandleSubmit}
            />
          </View>
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
    minWidth: windowWidth * 0.372, // 476
    minHeight: windowHeight * 0.58, // 642
    borderRadius: hp(8),
    elevation: 7,
    paddingTop: windowHeight * 0.043, // 32
    paddingBottom: windowHeight * 0.043, // 32
  },
  mainTop: {
    marginBottom: windowHeight * 0.043, // 64
  },
  mainMid: {
    position: 'relative',
  },
  mainText: {
    fontSize: windowWidth * 0.03125,
    fontFamily: 'NotoSansKR-Bold',
    color: '#707070',
  },
  mainBot: {
    marginTop: windowHeight * 0.043, //64
    marginBottom: windowHeight * 0.043, //64
  },
  infoText: {
    fontSize: hp(2.5),
    color: '#707070',
    width: windowWidth * 0.26,
    marginTop: windowHeight * 0.02,
    marginBottom: windowHeight * 0.05,
  },
});

export default PinAuthentication;
