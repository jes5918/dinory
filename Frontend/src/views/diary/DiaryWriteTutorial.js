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
import AlertModal from '../../components/elements/AlertModal';
import SelectModal from '../../components/elements/SelectModal';

import {
  createDiary,
  imageCaptioning,
  saveWords,
  grammarCheck,
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
  const bgurl = require('../../assets/images/background4.png');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectImage, setSelectImage] = useState(false);
  const [captionWords, setCaptionWords] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [somethignwrong, setSomethignwrong] = useState(false);
  const [koreanWarnModalVisible, setKoreanWarnModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [quit, setQuit] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const [title, setTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState('');
  const [tempPagenum, setTempPagenum] = useState(false);
  const [grammarchecked, setGrammarchecked] = useState(false);
  const [checkData, setCheckData] = useState(null);

  const closeModal = (e) => {
    if (e === 1) {
      setTimeout(() => {
        setModalVisible(!modalVisible);
      }, 2000);
    } else if (e === 2) {
      console.log('여기로 들어온다.');
      setTimeout(() => {
        setKoreanWarnModalVisible(!koreanWarnModalVisible);
      }, 2000);
    } else if (e === 3) {
      setTimeout(() => {
        setSomethignwrong(!somethignwrong);
      }, 2000);
    } else if (e === 4) {
      setTimeout(() => {
        setSuccess(!success);
        navigation.navigate('Main');
      }, 1000);
    }
  };
  const openConfirmSave = () => {
    setConfirmSave(true);
  };

  const changeModalState = (e) => {
    if (e === 1) {
      setModalVisible(!modalVisible);
    } else if (e === 2) {
      setKoreanWarnModalVisible(!koreanWarnModalVisible);
    } else if (e === 3) {
      setSomethignwrong(!koreanWarnModalVisible);
    } else if (e === 4) {
      navigation.navigate('DiaryList');
    } else if (e === 5) {
      setConfirmSave(!confirmSave);
    } else if (e === 6) {
      setQuit(!quit);
    }
  };

  const gotoBack = () => {
    setCurrentPage(currentPage - 1);
  };
  const gotoWriteDiary = () => {
    const selectedWordList = captionWords.filter(
      (word) => word.checked === true,
    );
    if (selectedWordList.length !== 0) {
      console.log('보내는 데이터', selectedWordList);
      const Token =
        'jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJzdWVtaW4xIiwiZXhwIjoxNjE3NzcwMjQyLCJlbWFpbCI6InBvcG9wMDkwOTBAbmF2ZXIuY29tIn0.NjNEuTXianJ1lQ2SzsyxV6uZgELGTM1236DVw76MtE4';
      const child = 10;
      //////////
      fetch(`https://j4b105.p.ssafy.io/words/?child=${child}`, {
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
      formData.append('num', 2);
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

  const checkGrammar = () => {
    const formData = new FormData();
    formData.append('text', diaryContent);
    grammarCheck(
      formData,
      (res) => {
        console.log('grammarcheck', res.data);
        setCheckData(res.data.corrections);
        setGrammarchecked(true);
      },
      (err) => {
        console.error(err);
        alert('다시 시도해주세요!');
      },
    );
  };

  const saveDiary = () => {
    if (title && diaryContent && selectImage) {
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
          setConfirmSave(!confirmSave);
          setSuccess(!success);
          // setKoreanWarnModalVisible(!koreanWarnModalVisible);
        },
        (err) => {
          console.error(err);
          if (err.error === '한글은 작성할 수 없습니다') {
            setConfirmSave(!confirmSave);
            setKoreanWarnModalVisible(!koreanWarnModalVisible);
          } else {
          }
        },
      );
    } else {
      alert('여기!!');
    }
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
    setTitle(e.nativeEvent.text);
  };

  const onHandleChangeContent = (e) => {
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
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'black',
            position: 'absolute',
            zIndex: 10,
            opacity: 0.6,
          }}></View>
        <View style={styles.arrowBtnBox}>
          <ArrowButton onHandlePress={() => setQuit(!quit)} />
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
            setQuit(!quit);
            navigation.goBack();
          }}
          onHandlePressRefuse={() => changeModalState(6)}
        />
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
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'black',
            position: 'absolute',
            zIndex: 10,
            opacity: 0.6,
          }}></View>
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
          title={title}
          content={diaryContent}
          wordList={captionWords}
          onHandleChangeTitle={(e) => onHandleChangeTitle(e)}
          onHandleChangeContent={(e) => onHandleChangeContent(e)}
          onHandleChangeTemp={(e) => changeTemp(e)}
          onHandleCheckGrammar={() => checkGrammar()}
          onHandleSaveDiary={() => openConfirmSave()}
          grammarchecked={grammarchecked}
          checkData={checkData}></WriteDiary>
        <AlertModal
          modalVisible={koreanWarnModalVisible}
          onHandleCloseModal={() => changeModalState(2)}
          text={'한글이 포함되어있어요!'}
          iconName={'exclamationcircle'}
          color={'red'}
          setTimeFunction={() => closeModal(2)}
        />
        <AlertModal
          modalVisible={somethignwrong}
          onHandleCloseModal={() => changeModalState(3)}
          text={'일기 저장에 실패했어요. 다시 시도해주세요'}
          iconName={'exclamationcircle'}
          color={'red'}
          setTimeFunction={() => closeModal(3)}
        />
        <AlertModal
          modalVisible={success}
          onHandleCloseModal={() => changeModalState(4)}
          text={'오늘의 일기가 저장됐어요!'}
          iconName={'checkcircle'}
          color={'green'}
          setTimeFunction={() => closeModal(4)}
        />
        <SelectModal
          modalVisible={confirmSave}
          alertText={'일기를 저장해볼까요?'}
          refuseText={'취소'}
          allowText={'저장할래요!'}
          onHandlePressAllow={() => saveDiary()}
          onHandlePressRefuse={() => changeModalState(5)}
        />
      </ImageBackground>
    );
  }
}
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
const styles = StyleSheet.create({
  tutorialText: {
    color: 'black',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: width * 0.02,
    marginVertical: width * 0.003,
  },
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
    zIndex: 5,
  },
  mainIconBox: {
    zIndex: 5,
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
