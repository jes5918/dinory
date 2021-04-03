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
  child,
}) {
  const bgurl = require('../../../assets/images/background4.png');
  const navigation = useNavigation();

  return (
    <ImageBackground source={bgurl} style={styles.bgBox}>
      {child}
      <View style={styles.arrowBtnBox}>
        <ArrowButton onHandlePress={() => navigation.goBack()} />
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
