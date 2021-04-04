import React, {useEffect, useState, useCallback, useRef} from 'react';
import {ImageBackground, StyleSheet, Dimensions, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import UploadPhoto from '../../components/diary/diaryPage/UploadPhoto';
import ShowICresult from '../../components/diary/diaryPage/ShowICresult';
import CreateDiary from '../../components/diary/diaryPage/CreateDiary';
import LoadingSec from '../../components/elements/LoadingSec';
import Intro from '../../components/diary/tutorial.js/Intro';
import Finish from '../../components/diary/tutorial.js/Finish';
import RoundButton from '../../components/elements/RoundButton';
import {
  createDiary,
  imageCaptioning,
  saveWords,
  grammarCheck,
} from '../../api/diary/writeDiary';
import TypeWriter from 'react-native-typewriter';
import DiraryAgainTutorial from '../../views/diary/DiraryAgainTutorial';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce} from 'lodash';
import HowToWrite from '../../components/diary/tutorial.js/HowToWrite';
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

const debounceSomethingFunc = debounce(() => {}, 300);

export default function DiaryMainTutorial() {
  const navigation = useNavigation();
  const bgurl = require('../../assets/images/background4.png');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectImage, setSelectImage] = useState(false);
  const [captionWords, setCaptionWords] = useState(false);
  const [somethignwrong, setSomethignwrong] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [koreanWarnModalVisible, setKoreanWarnModalVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trylater, setTrylater] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const [tempPagenum, setTempPagenum] = useState(false);
  const [grammarchecked, setGrammarchecked] = useState(false);
  const [checkData, setCheckData] = useState('');
  const [childPk, setChildPk] = useState('');
  const [voicePk, setVoicePk] = useState(false);
  const [token, setToken] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [tryagain, setTryagain] = useState(false);
  const [checkNull, setCheckNull] = useState(false);
  const [wordSaveSpinner, setWordSaveSpinner] = useState(false);
  const [title, setTitle] = useState('');
  const [diaryContent, setDiaryContent] = useState('');
  const titleInput = useRef();
  const contentInput = useRef();
  const titleChange = (e) => {
    setTitle(e.nativeEvent.text);
    debounceSomethingFunc();
  };
  const contentChange = (e) => {
    setDiaryContent(e.nativeEvent.text);
    debounceSomethingFunc();
  };
  const gotoMain = () => {
    navigation.goBack();
  };
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
        gotoNext();
      }, 1000);
    } else if (e === 7) {
      setTimeout(() => {
        setTryagain(false);
      }, 2000);
    } else if (e === 8) {
      setTimeout(() => {
        setTrylater(false);
      }, 2000);
    } else if (e === 9) {
      setTimeout(() => {
        setCheckNull(false);
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
    } else if (e === 7) {
      setTryagain(false);
    } else if (e === 8) {
      setTrylater(false);
    } else if (e === 9) {
      setCheckNull(false);
    }
  };

  const gotoBack = () => {
    setCurrentPage(currentPage - 1);
  };
  const gotoNext = () => {
    setCurrentPage(currentPage + 1);
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
          setCurrentPage(5);
        }
      });
    } else {
      setWordSaveSpinner(false);
      setCurrentPage(5);
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
          setCurrentPage(3);
        },
        () => {
          setSelectImage(false);
          setCurrentPage(2);
          setModalVisible(!modalVisible);
        },
      );
    }
  }, [selectImage]);

  const checkGrammar = () => {
    if (diaryContent && title) {
      setSpinner(true);
      const formData = new FormData();
      formData.append('text', title + '\n' + diaryContent);
      grammarCheck(
        formData,
        (res) => {
          setCheckData(res.data.corrections);
          setSpinner(false);
          setGrammarchecked(true);
        },
        (err) => {
          if (err.response.data.error === '한글은 작성할 수 없습니다') {
            setSpinner(false);
            setKoreanWarnModalVisible(true);
          } else {
            setSpinner(false);
            setTryagain(true);
          }
        },
      );
    } else {
      setCheckNull(true);
    }
  };

  const onHandleClear = () => {
    setTitle('');
    setDiaryContent('');
    setGrammarchecked(false);
    setCheckData(false);
    gotoBack();
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
      setConfirmSave(false);
      setCheckNull(true);
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

  const propsSetSelectImage = (e) => {
    setSelectImage(e);
  };

  if (currentPage < 0) {
    return <DiraryAgainTutorial onhandleEnd={() => tutorialToggle()} />;
  } else if (currentPage === 0) {
    return (
      <ImageBackground source={bgurl} style={styles.bgBox}>
        <LoadingSec />
      </ImageBackground>
    );
  } else if (currentPage === 1) {
    return <Intro gotoNext={() => gotoNext()} />;
  } else if (currentPage === 2) {
    return (
      <UploadPhoto
        onHandleTutorialToggle={() => tutorialToggle()}
        PsetSelectImage={propsSetSelectImage}
        changeModalState={(e) => changeModalState(e)}
        closeModal={(e) => closeModal(e)}
        modalVisible={modalVisible}
        onHandleArrow={() => gotoBack()}>
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'black',
            position: 'absolute',
            zIndex: 12,
            opacity: 0.6,
          }}
        />
      </UploadPhoto>
    );
  } else if (currentPage == 3) {
    return (
      <ShowICresult
        onHandleTutorialToggle={() => tutorialToggle()}
        onHandleGoback={() => gotoBack()}
        selected={selectImage.uri}
        captionWords={captionWords}
        changeTemp={(e) => changeTemp(e)}
        gotoWriteDiary={() => gotoWriteDiary()}
        wordSaveSpinner={wordSaveSpinner}
        changeModalState={(e) => changeModalState(e)}
        closeModal={(e) => closeModal(e)}
        trylater={trylater}>
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'black',
            position: 'absolute',
            zIndex: 20,
            opacity: 0.6,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            zIndex: 22,
          }}>
          <RoundButton
            text={'Next'}
            color={'#56A4F1'}
            styleProps={{margin: width * 0.03}}
            onHandlePress={() => gotoNext()}
          />
          <View
            style={{
              backgroundColor: 'rgba(256, 256, 256, 0.8)',
              width: width,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: width * 0.01,
              height: height * 0.35,
              paddingHorizontal: width * 0.04,
              zIndex: 15,
            }}>
            <TypeWriter
              style={{
                fontFamily: 'HoonPinkpungchaR',
                fontSize: width * 0.026,
                color: 'black',
                lineHeight: width * 0.04,
              }}
              typing={1}
              fixed={true}
              initialDelay={500}
              minDelay={20}>
              자, 어떤 단어들이 나왔는지 같이 살펴볼까요? 단어 박스에 나온
              단어들을 클릭해 뜻을 확인해보고 발음을 들어보세요! 또, 추가 하고
              싶은 단어들을 체크해 내 단어장에 추가해 보아요!
            </TypeWriter>
          </View>
        </View>
      </ShowICresult>
    );
  } else if (currentPage == 4) {
    return (
      <ShowICresult
        onHandleTutorialToggle={() => tutorialToggle()}
        onHandleGoback={() => gotoBack()}
        selected={selectImage.uri}
        captionWords={captionWords}
        changeTemp={(e) => changeTemp(e)}
        gotoWriteDiary={() => gotoWriteDiary()}
        wordSaveSpinner={wordSaveSpinner}
        changeModalState={(e) => changeModalState(e)}
        closeModal={(e) => closeModal(e)}
        trylater={trylater}>
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'black',
            position: 'absolute',
            zIndex: 12,
            opacity: 0.6,
          }}
        />
      </ShowICresult>
    );
  } else if (currentPage == 5) {
    return (
      <HowToWrite
        OnHandleGotoBack={() => {
          gotoBack();
        }}
        OnHandleGotoNext={() => gotoNext()}
      />
    );
  } else if (currentPage === 6) {
    return (
      <CreateDiary
        onHandleTutorialToggle={() => tutorialToggle()}
        onHandleGoback={() => gotoBack()}
        changeModalState={(e) => changeModalState(e)}
        closeModal={(e) => closeModal(e)}
        changeTemp={(e) => changeTemp(e)}
        checkGrammar={() => checkGrammar()}
        openConfirmSave={() => openConfirmSave()}
        grammarchecked={grammarchecked}
        checkData={checkData}
        koreanWarnModalVisible={koreanWarnModalVisible}
        somethignwrong={somethignwrong}
        success={success}
        confirmSave={confirmSave}
        tryagain={tryagain}
        checkNull={checkNull}
        spinner={spinner}
        saveDiary={() => saveDiary()}
        captionWords={captionWords}
        diaryContent={diaryContent}
        title={title}
        titleInput={titleInput}
        onHandleChangeTitle={(e) => titleChange(e)}
        onHandleChangeContent={(e) => contentChange(e)}
        onHandleClear={() => onHandleClear()}>
        <View
          style={{
            width: width,
            height: height,
            backgroundColor: 'black',
            position: 'absolute',
            zIndex: 10,
            opacity: 0.6,
          }}
        />
      </CreateDiary>
    );
  } else if (currentPage === 7) {
    return <Finish />;
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
});
