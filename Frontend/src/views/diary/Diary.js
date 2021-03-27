import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Modal,
  Dimensions,
  Pressable,
} from 'react-native';
import SelectImage from '../../components/diary/SelectImage';
import ImageCaption from '../../components/diary/ImageCaption';
import WriteDiary from '../../components/diary/WriteDiary';
import ArrowButton from '../../components/elements/ArrowButton';
import LoadingSec from '../../components/elements/LoadingSec';

import {createDiary, imageCaptioning} from '../../api/diary/writeDiary';
import {useNavigation} from '@react-navigation/core';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Diary() {
  const bgurl = require('../../assets/images/background3.png');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectImage, setSelectImage] = useState(false);
  const [captionWords, setCaptionWords] = useState(false);
  const [addWordList, setAddWordList] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 2000);
  };
  const gotoBack = () => {
    setCurrentPage(currentPage - 1);
  };
  const gotoWriteDiary = () => {
    setCurrentPage(3);
  };
  useEffect(() => {
    if (selectImage) {
      setCurrentPage(0);
      const formData = new FormData();
      formData.append('img', {
        uri: selectImage.uri,
        type: selectImage.type,
        name: selectImage.fileName,
      });
      imageCaptioning(
        formData,
        (res) => {
          setCaptionWords(res.data.data);
          setCurrentPage(2);
        },
        (err) => {
          console.error(err);
          setSelectImage(false);
          setCurrentPage(1);
          setModalVisible(!modalVisible);
        },
      );
    }
  }, [selectImage]);

  if (currentPage === 1) {
    return (
      <ImageBackground source={bgurl} style={styles.bgBox}>
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
            }}>
            <MaterialIcons style={styles.mainIcon} name={'questioncircleo'} />
          </TouchableOpacity>
        </View>
        <SelectImage setSelectImage={setSelectImage}></SelectImage>
        <Modal
          transparent={true}
          visible={modalVisible}
          onShow={() => closeModal()}
          onRequestClose={() => {
            alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <MaterialIcons
                animationType="fade"
                style={styles.modalIcon}
                name={'exclamationcircle'}
              />
              <Text style={styles.modalText}>사진을 다시 올려주세요!</Text>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    );
  } else if (currentPage === 0) {
    return (
      <ImageBackground source={bgurl} style={styles.bgBox}>
        <LoadingSec></LoadingSec>
      </ImageBackground>
    );
  } else if (currentPage == 2) {
    return (
      <ImageBackground source={bgurl} style={styles.bgBox}>
        <View style={styles.arrowBtnBox}>
          <ArrowButton onHandlePress={() => gotoBack()} />
        </View>
        <View style={styles.mainIconBox}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons style={styles.mainIcon} name={'questioncircleo'} />
          </TouchableOpacity>
        </View>
        <ImageCaption
          selectImg={selectImage.uri}
          wordsList={captionWords}
          onHandlePress={() => gotoWriteDiary()}></ImageCaption>
      </ImageBackground>
    );
  } else if (currentPage == 3) {
    return (
      <ImageBackground source={bgurl} style={styles.bgBox}>
        <View style={styles.arrowBtnBox}>
          <ArrowButton onHandlePress={() => gotoBack()} />
        </View>
        <View style={styles.mainIconBox}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons style={styles.mainIcon} name={'questioncircleo'} />
          </TouchableOpacity>
        </View>
        <WriteDiary wordList={captionWords}></WriteDiary>
      </ImageBackground>
    );
  }
}
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
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
  mainIconBox: {
    zIndex: 999,
    position: 'absolute',
    top: '4%',
    right: '2%',
    width: width * 0.05,
    height: width * 0.05,
  },
  mainIcon: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  modalIcon: {
    color: 'red',
    fontSize: width * 0.06,
    marginVertical: width * 0.015,
  },
  //////modal
  modalPosition: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 150,
    right: width * 0.5,
    zIndex: 400,
    // backgroundColor: 'red',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: width * 0.018,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: width * 0.02,
    color: '#888888',
  },
});
