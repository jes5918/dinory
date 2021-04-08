import React, {useState, useEffect, useCallback} from 'react';
import SelectLayout from '../../components/elements/SelectLayout';
import Header from '../../components/elements/Header';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Sound from 'react-native-sound';
import voiceOne from '../../assets/sound/0hellonicetomeetyou.wav';
import voiceTwo from '../../assets/sound/1hellonicetomeetyou.wav';
import voiceThr from '../../assets/sound/2hellonicetomeetyou.wav';
import voiceFou from '../../assets/sound/3hellonicetomeetyou.wav';
import voiceFiv from '../../assets/sound/4hellonicetomeetyou.wav';
import AlertModal from '../../components/elements/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {editChildVoice} from '../../api/accounts/childSettings';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const dimensions = Dimensions.get('window');
const height = dimensions.height;

export default function SelectVoice() {
  const [modalVisible, setModalVisible] = useState(false);
  const [fmodalVisible, setfModalVisible] = useState(false);
  const [child, setChild] = useState('');
  const [voice, setVoice] = useState('');
  const [originVoice, setOriginVoice] = useState('');
  const navigation = useNavigation();
  const url = require('../../assets/images/background2.png');
  const [imgNumber, setImageNumber] = useState(-1);

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

  const getProfileInfo = useCallback(async () => {
    await AsyncStorage.getItem('profile').then((profile) => {
      const data = JSON.parse(profile);
      setChild(data.profile_pk);
      setOriginVoice(data.voice_pk);
    });
  }, []);

  useEffect(() => {
    getProfileInfo();
  });

  const submitVoice = () => {
    const formData = new FormData();
    if (voice !== '') {
      formData.append('voice', Number(voice));
    } else {
      console.log('originVoice : ', originVoice);
      formData.append('voice', originVoice);
    }
    editChildVoice(
      child,
      formData,
      (res) => {
        let profileData = '';
        if (res.status === 200) {
          if (voice !== '') {
            profileData = {
              voice_pk: voice,
            };
          } else {
            profileData = {
              voice_pk: originVoice,
            };
          }
          AsyncStorage.mergeItem('profile', JSON.stringify(profileData));
          changeModalState(1);
          setTimeout(() => {
            navigation.navigate('Main');
          }, 2000);
        } else {
          changeModalState(2);
        }
      },
      (err) => {},
    );
  };
  const closeModal = (num) => {
    setTimeout(() => {
      if (num === 1) {
        setModalVisible(!modalVisible);
      } else if (num === 2) {
        setfModalVisible(!fmodalVisible);
      }
    }, 1500);
  };
  const changeModalState = (num) => {
    if (num === 1) {
      setModalVisible(!modalVisible);
    } else if (num === 2) {
      setfModalVisible(!fmodalVisible);
    }
  };

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={url}>
        <Header />
        <View style={styles.body}>
          <SelectLayout
            title={'원하는 목소리를 선택해주세요'}
            btnText={'변경완료'}
            imgNumber={imgNumber}
            onHandlePressC1={() => {
              soundf.setVolume(0.5);
              setVoice(0);
              setImageNumber(0);
              soundf.play();
            }}
            onHandlePressC2={() => {
              sounds.setVolume(0.5);
              setVoice(1);
              setImageNumber(1);
              sounds.play();
            }}
            onHandlePressC3={() => {
              soundt.setVolume(0.5);
              setVoice(2);
              setImageNumber(2);
              soundt.play();
            }}
            onHandlePressC4={() => {
              soundfo.setVolume(0.5);
              setVoice(3);
              setImageNumber(3);
              soundfo.play();
            }}
            onHandlePressC5={() => {
              soundfi.setVolume(0.5);
              setVoice(4);
              setImageNumber(4);
              soundfi.play();
            }}
            onHandlePressBasic={() => submitVoice()}
          />
          <AlertModal
            modalVisible={modalVisible}
            onHandleCloseModal={() => changeModalState(1)}
            text={'목소리가 변경되었어요!'}
            iconName={'smileo'}
            color={'green'}
            setTimeFunction={() => closeModal(1)}
          />
          <AlertModal
            modalVisible={fmodalVisible}
            onHandleCloseModal={() => changeModalState(2)}
            text={'다시 시도해주세요!'}
            iconName={'frowno'}
            color={'red'}
            setTimeFunction={() => closeModal(2)}
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
    backgroundColor: 'transparent',
  },
});
