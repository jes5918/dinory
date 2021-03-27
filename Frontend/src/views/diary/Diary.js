import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, Image} from 'react-native';
import SelectImage from '../../components/diary/SelectImage';
import ImageCaption from '../../components/diary/ImageCaption';
import WriteDiary from '../../components/diary/WriteDiary';
import ArrowButton from '../../components/elements/ArrowButton';
import LoadingSec from '../../components/elements/LoadingSec';

import {useNavigation} from '@react-navigation/core';
import {createDiary, imageCaptioning} from '../../api/diary/writeDiary';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Diary() {
  const bgurl = require('../../assets/images/background3.png');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectImage, setSelectImage] = useState(false);
  const [captionWords, setCaptionWords] = useState(false);
  const [addWordList, setAddWordList] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    console.log('qqqqqqqqqqqqqqq', selectImage);
    if (selectImage) {
      setCurrentPage(1);
      console.log('@@@@@@@@@', selectImage);
      const formData = new FormData();
      formData.append('img', {
        uri: selectImage.uri,
        type: selectImage.type,
        name: selectImage.fileName,
      });
      imageCaptioning(
        formData,
        (res) => {
          setCaptionWords(res.data);
          console.log('resData', res.data);
          setCurrentPage(0);
        },
        (err) => {
          console.error(err);
        },
      );
    }
  }, [selectImage]);
  if (currentPage === 0) {
    return (
      <ImageBackground source={bgurl} style={styles.bgBox}>
        <View style={styles.arrowBtnBox}>
          <ArrowButton onHandlePress={() => navigation.goBack()} />
        </View>
        <SelectImage setSelectImage={setSelectImage}></SelectImage>
      </ImageBackground>
    );
  } else if (currentPage === 1) {
    return (
      <ImageBackground source={bgurl} style={styles.bgBox}>
        <LoadingSec></LoadingSec>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  bgBox: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: 1,
  },
  arrowBtnBox: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    overflow: 'visible',
    top: '3%',
    left: '2%',
    zIndex: 999,
  },
});
