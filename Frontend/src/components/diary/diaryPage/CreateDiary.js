import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  BackHandler,
} from 'react-native';
import ArrowButton from '../../elements/ArrowButton';
import AlertModal from '../../elements/AlertModal';
import SelectModal from '../../elements/SelectModal';
import WriteDiary from '../WriteDiary';
import MaterialIcons from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

export default function CreateDiary({
  onHandleTutorialToggle,
  onHandleGoback,
  changeModalState,
  closeModal,
  changeTemp,
  openConfirmSave,
  checkGrammar,
  grammarchecked,
  checkData,
  koreanWarnModalVisible,
  somethignwrong,
  success,
  confirmSave,
  tryagain,
  checkNull,
  spinner,
  saveDiary,
  captionWords,
  onHandleChangeTitle,
  onHandleChangeContent,
  onHandleClear,
  children,
}) {
  const navigation = useNavigation();
  const bgurl = require('../../../assets/images/background4.png');
  const [quit, setQuit] = useState(false);
  const toggleQuit = () => {
    setQuit(false);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setQuit(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <ImageBackground source={bgurl} style={styles.bgBox}>
      {children}
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
      <WriteDiary
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
      <AlertModal
        modalVisible={checkNull}
        onHandleCloseModal={() => changeModalState(9)}
        text={'제목 혹은 내용을 입력해주세요!'}
        iconName={'exclamationcircle'}
        color={'red'}
        setTimeFunction={() => closeModal(9)}
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
      <SelectModal
        modalVisible={quit}
        alertText={'지금 나가면 저장되지 않아요.'}
        secondText={'정말 나가시겠어요?'}
        refuseText={'취소'}
        allowText={'나가기'}
        onHandlePressAllow={() => {
          setQuit(false);
          onHandleClear();
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
    zIndex: 33,
  },
  mainIconBox: {
    zIndex: 6,
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
