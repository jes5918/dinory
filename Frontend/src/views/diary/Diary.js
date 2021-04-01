import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';

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
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [checkData, setCheckData] = useState('');
  const [childPk, setChildPk] = useState('');
  const [voicePk, setVoicePk] = useState(false);
  const [token, setToken] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [tryagain, setTryagain] = useState(false);
  const [wordSaveSpinner, setWordSaveSpinner] = useState(false);
  const [trylater, setTrylater] = useState(false);

  const closeModal = (e) => {
    if (e === 1) {
      setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    } else if (e === 2) {
      setTimeout(() => {
        setKoreanWarnModalVisible(false);
      }, 2000);
    } else if (e === 3) {
      setTimeout(() => {
        setSomethignwrong(false);
      }, 2000);
    } else if (e === 4) {
      setTimeout(() => {
        setSuccess(false);
        navigation.navigate('Main');
      }, 1000);
    } else if (e === 7) {
      setTimeout(() => {
        setTryagain(false);
      }, 2000);
    } else if (e === 8) {
      setTimeout(() => {
        setTrylater(false);
      }, 2000);
    }
  };
  const openConfirmSave = () => {
    setConfirmSave(true);
  };

  const changeModalState = (e) => {
    if (e === 1) {
      setModalVisible(false);
    } else if (e === 2) {
      setKoreanWarnModalVisible(false);
    } else if (e === 3) {
      setSomethignwrong(false);
    } else if (e === 4) {
      navigation.navigate('Main');
    } else if (e === 5) {
      setConfirmSave(false);
    } else if (e === 6) {
      setQuit(false);
    } else if (e === 7) {
      setTryagain(false);
    } else if (e === 8) {
      setTrylater(false);
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
      setWordSaveSpinner(true);
      fetch(`https://j4b105.p.ssafy.io/api/words/?child=${childPk}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `jwt ${token}`,
        },
        body: JSON.stringify({
          DATA: selectedWordList,
        }),
      }).then((res) => {
        if (res.status === 201) {
          setWordSaveSpinner(false);
          setCurrentPage(3);
        }
      });
      ///////////////
    } else {
      setWordSaveSpinner(false);
      setTrylater(true);
      setCurrentPage(3);
    }
  };
  const getChildPk = async () => {
    try {
      const data = await AsyncStorage.getItem('profile');
      const parsData = JSON.parse(data);
      return parsData;
    } catch (e) {}
  };

  const getToken = async () => {
    try {
      const data = await AsyncStorage.getItem('jwt');
      return data;
    } catch (e) {}
  };
  useFocusEffect(
    useCallback(() => {
      getChildPk().then((res) => {
        setChildPk(res.profile_pk);
        setVoicePk(res.voice_pk);
      });
      getToken().then((res) => {
        setToken(res);
      });
    }, []),
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     if (selectImage) {
  //       setCurrentPage(0);
  //       const formData = new FormData();
  //       formData.append('img', {
  //         uri: selectImage.uri,
  //         type: selectImage.type,
  //         name: selectImage.fileName,
  //       });
  //       formData.append('num', voicePk);
  //       imageCaptioning(
  //         formData,
  //         (res) => {
  //           setCaptionWords(res.data.data);
  //           setCurrentPage(2);
  //         },
  //         (err) => {
  //           setSelectImage(false);
  //           setCurrentPage(1);
  //           setModalVisible(true);
  //         },
  //       );
  //     }
  //   }, [selectImage]),
  // );

  useEffect(() => {
    if (selectImage) {
      setCurrentPage(0);
      const formData = new FormData();
      formData.append('img', {
        uri: selectImage.uri,
        type: selectImage.type,
        name: selectImage.fileName,
      });
      formData.append('num', voicePk);
      imageCaptioning(
        formData,
        (res) => {
          setCaptionWords(res.data.data);
          setCurrentPage(2);
        },
        (err) => {
          setSelectImage(false);
          setCurrentPage(1);
          setModalVisible(!modalVisible);
        },
      );
    }
  }, [selectImage]);

  const checkGrammar = () => {
    setSpinner(true);
    const formData = new FormData();
    formData.append('text', diaryContent);
    grammarCheck(
      formData,
      (res) => {
        setCheckData(res.data.corrections);
        setSpinner(false);
        setGrammarchecked(true);
      },
      (err) => {
        console.log(err.response.data.error);
        if (err.response.data.error === '한글은 작성할 수 없습니다') {
          setSpinner(false);
          setKoreanWarnModalVisible(true);
        } else {
          setSpinner(false);
          setTryagain(true);
        }
      },
    );
  };

  const saveDiary = () => {
    if (title && diaryContent && selectImage) {
      setConfirmSave(false);
      setSpinner(true);
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

      createDiary(
        formData,
        childPk,
        (res) => {
          setSpinner(false);
          setSuccess(true);
        },
        (err) => {
          setSpinner(false);
          if (err.response.data.error === '한글은 작성할 수 없습니다') {
            setSpinner(false);
            setKoreanWarnModalVisible(true);
          } else {
          }
        },
      );
    } else {
      setTryagain(true);
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
    return <DiraryAgainTutorial onhandleEnd={() => tutorialToggle()} />;
  } else if (currentPage === 1) {
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
            onPress={() => tutorialToggle()}>
            <MaterialIcons style={styles.mainIcon} name={'questioncircleo'} />
          </TouchableOpacity>
        </View>
        <SelectImage setSelectImage={setSelectImage} />
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
            navigation.goBack();
          }}
          onHandlePressRefuse={() => changeModalState(6)}
        />
      </ImageBackground>
    );
  } else if (currentPage === 0) {
    return (
      <ImageBackground source={bgurl} style={styles.bgBox}>
        <LoadingSec />
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
        <ActivityIndicator
          size="large"
          color="#FB537B"
          style={{
            zIndex: 999,
            position: 'absolute',
            alignSelf: 'center',
            top: height * 0.5,
          }}
          animating={wordSaveSpinner}
        />
        <AlertModal
          modalVisible={trylater}
          onHandleCloseModal={() => changeModalState(8)}
          text={'조금 후에 다시 시도해주세요!'}
          iconName={'exclamationcircle'}
          color={'red'}
          setTimeFunction={() => closeModal(8)}
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
          checkData={checkData}
        />
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
        <AlertModal
          modalVisible={tryagain}
          onHandleCloseModal={() => changeModalState(7)}
          text={'조금 후에 다시 시도해주세요!'}
          iconName={'exclamationcircle'}
          color={'red'}
          setTimeFunction={() => closeModal(7)}
        />
        <ActivityIndicator
          size="large"
          color="#FB537B"
          style={{
            zIndex: 999,
            position: 'absolute',
            alignSelf: 'center',
            top: height * 0.5,
          }}
          animating={spinner}
        />
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
});
