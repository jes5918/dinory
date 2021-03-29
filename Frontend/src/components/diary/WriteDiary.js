import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';

import RoundButton from '../elements/RoundButton';
import WordList from './WordList';
import {createDiary} from '../../api/diary/writeDiary';

export default function WriteDiary({
  wordList,
  onHandleChangeTemp,
  onHandleSaveDiary,
  onHandleChangeTitle,
  onHandleChangeContent,
  onHandleCheckGrammar,
}) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const grammarCheck = () => {
    alert('이문법이 맞는 것 같아?');
  };
  // const onChangeTitle = (e) => {
  //   console.log(e.nativeEvent.text);
  //   setTitle(e.nativeEvent.text);
  // };
  // const onChangeText = (e) => {
  //   console.log(e.nativeEvent.text);
  //   setText(e.nativeEvent.text);
  // };
  const saveDiary = () => {
    alert('일기 저장!');
  };

  const arrText = ['문', '법', '체', '크'];
  const arrText2 = ['일', '기', '저', '장'];
  return (
    <KeyboardAvoidingView behavior={'height'} style={[styles.container]}>
      <View style={[styles.wrapper]}>
        <View style={[styles.dirayBox]}>
          <ScrollView style={styles.textInputBox}>
            <View style={[styles.titleBox]}>
              <Text style={[styles.text]}>제목 :</Text>
              <TextInput
                style={[styles.TitleInput]}
                autoCompleteType={'off'}
                onChange={(e) => onHandleChangeTitle(e)}></TextInput>
            </View>
            <TextInput
              style={[styles.contentInput]}
              multiline
              autoCompleteType={'off'}
              onChange={(e) => onHandleChangeContent(e)}></TextInput>
          </ScrollView>
        </View>
        <View style={[styles.buttonWrapper]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onHandleCheckGrammar()}>
            <View style={styles.buttonPosition}>
              {arrText.map((tempText, idx) => {
                return (
                  <Text key={idx} style={styles.textIndex}>
                    {tempText}
                  </Text>
                );
              })}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onHandleSaveDiary()}>
            <View style={styles.buttonPosition2}>
              {arrText2.map((tempText, idx) => {
                return (
                  <Text key={idx} style={styles.textIndex}>
                    {tempText}
                  </Text>
                );
              })}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <WordList
        words={wordList}
        onHandleChangeTemp={(e) => onHandleChangeTemp(e)}></WordList>
    </KeyboardAvoidingView>
  );
}
const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;
const screenHeight = dimensions.height;
const styles = StyleSheet.create({
  buttonPosition: {
    width: 'auto',
    height: 'auto',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#FB537B',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPosition2: {
    width: 'auto',
    height: 'auto',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#76b0e9',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    right: screenWidth * 0.066,
    top: screenHeight * 0.05,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleBox: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    color: 'black',
  },
  textIndex: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: screenWidth * 0.016,
    color: '#fff',
  },
  TitleInput: {
    // borderWidth: 2,
    width: '60%',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  contentInput: {
    // borderWidth: 2,
    width: '100%',
    // minHeight: screenHeight * 0.45,
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    borderRadius: 30,
    paddingHorizontal: 10,
    // borderWidth: 2,
    // borderColor: 'gray',
    // backgroundColor: 'yellow',
  },
  textInputBox: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 30,
    // flex: 1,
    // backgroundColor: 'green',
    height: '100%',
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.5%',
  },
  dirayBox: {
    // position: 'relative',
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: '1.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    marginVertical: 15,
  },
  wrapper: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
