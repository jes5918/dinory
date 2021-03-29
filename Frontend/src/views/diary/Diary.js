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

import {
  createDiary,
  imageCaptioning,
  saveWords,
} from '../../api/diary/writeDiary';
import {useNavigation} from '@react-navigation/core';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DiraryAgainTutorial from '../../views/diary/DiraryAgainTutorial';

///////날짜
const date = new Date();
const textMonth = String(date.getMonth() + 1);
const textDate = String(date.getDate());

const makeDate = (text) => {
  let newText = '';
  if (text.length === 1) {
    newText = '0' + text;
  } else {
    newText = text;
  }
  return newText;
};
const makeMonth = (text) => {
  let newText = '';
  if (text.length === 1) {
    newText = '0' + text;
  } else {
    newText = text;
  }
  return newText;
};
//////오늘의 날자 string
const year = String(date.getFullYear());
const month = makeMonth(textMonth);
const day = makeDate(textDate);

export default function Diary() {
  const bgurl = require('../../assets/images/background3.png');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectImage, setSelectImage] = useState(false);
  const [captionWords, setCaptionWords] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState(false);
  const [diaryContent, setDiaryContent] = useState(false);
  const [tempPagenum, setTempPagenum] = useState(false);
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 2000);
  };
  const gotoBack = () => {
    setCurrentPage(currentPage - 1);
  };
  const gotoWriteDiary = () => {
    console.log('버튼 눌렀을 때', captionWords);
    const selectedWordList = captionWords.filter(
      (word) => word.checked === true,
    );
    console.log('여기에 들어온다1.', selectedWordList);
    if (selectedWordList.length !== 0) {
      console.log('여기에 들어온다.', selectedWordList);

      // const formData = new FormData();
      // formData.append('DATA', selectedWordList);
      console.log('보내는 데이터', selectedWordList);
      const Token =
        'jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJzdWVtaW4xIiwiZXhwIjoxNjE3NzcwMjQyLCJlbWFpbCI6InBvcG9wMDkwOTBAbmF2ZXIuY29tIn0.NjNEuTXianJ1lQ2SzsyxV6uZgELGTM1236DVw76MtE4';
      const child = 10;
      //////////
      fetch(`http://j4b105.p.ssafy.io/words/?child=${child}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: Token,
        },
        body: JSON.stringify({
          DATA: selectedWordList,
        }),
      }).then((res) => {
        if (res.status === 201) {
          setCurrentPage(3);
        }
      });
      ///////////////
    } else {
      setCurrentPage(3);
    }
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
          console.log('caption', res);
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
  const gotoMain = () => {
    useNavigation().navigate('Main');
  };

  const saveDiary = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('img', {
      uri: selectImage.uri,
      type: selectImage.type,
      name: selectImage.fileName,
    });
    formData.append('content', diaryContent);
    formData.append('year', year);
    formData.append('month', month);
    formData.append('date', day);

    console.log('FormData', formData);
    createDiary(
      formData,
      10,
      (res) => {
        console.log('함수 실행');
        console.log('resData', res.data);
      },
      (err) => {
        console.error(err);
      },
    );
    ////////////////////////
    gotoMain();
  };

  const changeTemp = (e) => {
    setCaptionWords(e);
  };

  const tutorialToggle = () => {
    if (currentPage > 0) {
      setTempPagenum(currentPage);
      setCurrentPage(-1);
    } else if (currentPage < 0) {
      setCurrentPage(tempPagenum);
    }
  };

  const onHandleChangeTitle = (e) => {
    console.log('제목이 입력되는 중', e.nativeEvent.text);
    setTitle(e.nativeEvent.text);
  };

  const onHandleChangeContent = (e) => {
    console.log('내용이 입력되는 중', e.nativeEvent.text);
    setDiaryContent(e.nativeEvent.text);
  };

  if (currentPage < 0) {
    return (
      <DiraryAgainTutorial
        onhandleEnd={() => tutorialToggle()}></DiraryAgainTutorial>
    );
  } else if (currentPage === 1) {
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
            }}
            onPress={() => tutorialToggle()}>
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
            }}
            onPress={() => tutorialToggle()}>
            <MaterialIcons style={styles.mainIcon} name={'questioncircleo'} />
          </TouchableOpacity>
        </View>
        <ImageCaption
          selectImg={selectImage.uri}
          wordsList={captionWords}
          onHandlePress={() => gotoWriteDiary()}
          onHandleChangeTemp={(e) => changeTemp(e)}
        />
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
            }}
            onPress={() => tutorialToggle()}>
            <MaterialIcons style={styles.mainIcon} name={'questioncircleo'} />
          </TouchableOpacity>
        </View>
        <WriteDiary
          wordList={captionWords}
          onHandleChangeTitle={(e) => onHandleChangeTitle(e)}
          onHandleChangeContent={(e) => onHandleChangeContent(e)}
          onHandleChangeTemp={(e) => changeTemp(e)}
          onHandleSaveDiary={() => saveDiary()}></WriteDiary>
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
