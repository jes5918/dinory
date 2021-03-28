import React, {useEffect} from 'react';
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

export default function WriteDiary({wordList}) {
  const [title, setTitle] = React.useState('');
  const [text, setText] = React.useState('');

  const temp = [
    {textEn: 'happy', textKr: '행복'},
    {textEn: 'coding', textKr: '코딩'},
    {textEn: 'Jinoo', textKr: '닭띠유지누'},
    {textEn: 'computer', textKr: '컴퓨터'},
    {textEn: 'ZZangsm', textKr: '장수민'},
    {textEn: 'jes5918', textKr: '전의수'},
    {textEn: 'BossBaby', textKr: '윤지해'},
    {textEn: 'soldierShin', textKr: '신민호'},
  ];
  const grammarCheck = () => {
    alert('이문법이 맞는 것 같아?');
  };
  const onChangeTitle = (e) => {
    console.log(e.nativeEvent.text);
    setTitle(e.nativeEvent.text);
  };
  const onChangeText = (e) => {
    console.log(e.nativeEvent.text);
    setText(e.nativeEvent.text);
  };

  const arrText = ['문', '법', '체', '크'];
  return (
    <KeyboardAvoidingView behavior={'heigth'} style={[styles.container]}>
      <View style={[styles.wrapper]}>
        <View style={[styles.dirayBox]}>
          <ScrollView style={styles.textInputBox}>
            <View style={[styles.titleBox]}>
              <Text style={[styles.text]}>제목 :</Text>
              <TextInput
                style={[styles.TitleInput]}
                autoCompleteType={'off'}
                onChange={onChangeTitle}></TextInput>
            </View>
            <TextInput
              style={[styles.contentInput]}
              multiline
              autoCompleteType={'off'}
              onChange={onChangeText}></TextInput>
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => grammarCheck()}
          style={{position: 'absolute', right: '6%', top: '15%'}}>
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
      </View>
      <WordList words={wordList}></WordList>
    </KeyboardAvoidingView>
  );
}
const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;
const screenHeight = dimensions.height;
const styles = StyleSheet.create({
  buttonPosition: {
    width: 50,
    height: 150,
    backgroundColor: '#FB537B',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
    fontSize: 24,
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
