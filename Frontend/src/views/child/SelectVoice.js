import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import SelectLayout from '../../components/elements/SelectLayout';
import Header from '../../components/elements/Header';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import {editChildVoice} from '../../api/accounts/childSettings';
import Sound from 'react-native-sound';
import voiceOne from '../../assets/sound/0hellonicetomeetyou.wav';
import voiceTwo from '../../assets/sound/1hellonicetomeetyou.wav';
import voiceThr from '../../assets/sound/2hellonicetomeetyou.wav';
import voiceFou from '../../assets/sound/3hellonicetomeetyou.wav';
import voiceFiv from '../../assets/sound/4hellonicetomeetyou.wav';
import AlertModal from '../../components/elements/AlertModal';
import {useNavigation} from '@react-navigation/core';

const dimensions = Dimensions.get('window');
const height = dimensions.height;

export default function SelectVoice() {
  const [modalVisible, setModalVisible] = useState(false);
  const [fmodalVisible, setfModalVisible] = useState(false);
  const navigation = useNavigation();

  const url = require('../../assets/images/background2.png');
  let voice = '';
  const child = '10'; // 임시
  let soundf = new Sound(voiceOne, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });
  let sounds = new Sound(voiceTwo, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });
  let soundt = new Sound(voiceThr, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });
  let soundfo = new Sound(voiceFou, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });
  let soundfi = new Sound(voiceFiv, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
    }
  });
  const soundOn = (num) => {
    voice = num;
  };
  const submitVoice = () => {
    const formData = new FormData();
    formData.append('voice', voice);
    editChildVoice(
      child,
      formData,
      (res) => {
        if (res.status === 200) {
          changeModalState();
          setTimeout(() => {
            navigation.navigate('Main');
          }, 1500);
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 1000);
  };
  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };
  const fcloseModal = () => {
    setTimeout(() => {
      setfModalVisible(!fmodalVisible);
    }, 1000);
  };
  const fchangeModalState = () => {
    setfModalVisible(!fmodalVisible);
  };
  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={url}>
        <Header />
        <View style={styles.body}>
          <SelectLayout
            title={'원하는 목소리를 선택해주세요'}
            btnText={'변경완료'}
            onHandlePressC1={() => {
              soundf.setVolume(0.2);
              soundOn(1);
              soundf.play();
            }}
            onHandlePressC2={() => {
              sounds.setVolume(0.2);
              soundOn(2);
              sounds.play();
            }}
            onHandlePressC3={() => {
              soundt.setVolume(0.2);
              soundOn(3);
              soundt.play();
            }}
            onHandlePressC4={() => {
              soundfo.setVolume(0.2);
              soundOn(4);
              soundfo.play();
            }}
            onHandlePressC5={() => {
              soundfi.setVolume(0.2);
              soundOn(5);
              soundfi.play();
            }}
            onHandlePressBasic={() => submitVoice()}
          />
          <AlertModal
            modalVisible={modalVisible}
            onHandleCloseModal={() => changeModalState()}
            text={'목소리가 변경되었어요!'}
            iconName={'smileo'}
            setTimeFunction={() => closeModal()}
          />
          <AlertModal
            modalVisible={fmodalVisible}
            onHandleCloseModal={() => fchangeModalState()}
            text={'다시 시도해주세요!'}
            iconName={'frowno'}
            setTimeFunction={() => fcloseModal()}
          />
        </View>
      </BackgroundAbsolute>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 6,
    alignItems: 'center',
    marginTop: height * 0.17,
  },
});
