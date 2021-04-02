import React, {useEffect, useState, useCallback} from 'react';
import {View, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import SelectImage from '../SelectImage';
import ArrowButton from '../../elements/ArrowButton';
import AlertModal from '../../elements/AlertModal';
import SelectModal from '../../elements/SelectModal';

import MaterialIcons from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

export default function UploadPhoto({
  onHandleTutorialToggle,
  PsetSelectImage,
  changeModalState,
  closeModal,
  modalVisible,
}) {
  const bgurl = require('../../../assets/images/background4.png');
  const navigation = useNavigation();
  const [quit, setQuit] = useState(false);

  const toggleQuit = () => {
    setQuit(false);
  };

  return (
    <ImageBackground source={bgurl} style={styles.bgBox}>
      <View style={styles.arrowBtnBox}>
        <ArrowButton onHandlePress={() => setQuit(true)} />
      </View>
      <View style={styles.mainIconBox}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => onHandleTutorialToggle()}>
          <MaterialIcons style={styles.mainIcon} name={'questioncircleo'} />
        </TouchableOpacity>
      </View>
      <SelectImage setSelectImage={PsetSelectImage} />
      <AlertModal
        modalVisible={modalVisible}
        onHandleCloseModal={() => changeModalState(1)}
        text={'조금 후에 다시 시도해주세요!'}
        iconName={'exclamationcircle'}
        color={'red'}
        setTimeFunction={() => closeModal(1)}
      />
      <SelectModal
        modalVisible={quit}
        alertText={'지금 나가면 저장되지 않아요.'}
        secondText={'정말 나가시겠어요?'}
        refuseText={'취소'}
        allowText={'나가기'}
        onHandlePressAllow={() => {
          setQuit(false);
          navigation.navigate('Main');
        }}
        onHandlePressRefuse={() => toggleQuit()}
      />
    </ImageBackground>
  );
}

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
const styles = StyleSheet.create({
  bgBox: {
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
    zIndex: 1,
    width: width,
    height: height,
  },
  arrowBtnBox: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    overflow: 'visible',
    top: height * 0.02,
    left: '2%',
    zIndex: 999,
  },
  mainIconBox: {
    zIndex: 999,
    position: 'absolute',
    top: height * 0.02,
    right: '2%',
    width: width * 0.05,
    height: width * 0.05,
  },
  mainIcon: {
    color: '#fff',
    fontSize: width * 0.04,
  },
});
