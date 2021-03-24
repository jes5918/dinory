import React from 'react';
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
} from 'react-native';

import CheckBox from '../elements/CheckBox.js';
import WordList from './WordList';

export default function WriteDiary({}) {
  const temp = [
    {textEn: 'happy', textKr: '행복'},
    {textEn: 'coding', textKr: '코딩'},
    {textEn: 'people', textKr: '사람'},
    {textEn: 'computer', textKr: '컴퓨터'},
    {textEn: 'computer', textKr: '컴퓨터'},
    {textEn: 'computer', textKr: '컴퓨터'},
    {textEn: 'computer', textKr: '컴퓨터'},
    {textEn: 'computer', textKr: '컴퓨터'},
  ];
  const grammarCheck = () => {
    alert('Grammar Check!');
  };

  return (
    <KeyboardAvoidingView behavior={'heigth'} style={[styles.container]}>
      <View style={[styles.dirayBox]}>
        <ScrollView style={styles.textInputBox}>
          <TextInput
            style={[styles.TitleInput]}
            autoCompleteType={'off'}
            autoFocus
            defaultValue={'제목 : '}></TextInput>
          <TextInput
            style={[styles.contentInput]}
            multiline
            autoCompleteType={'off'}
            autoFocus
            defaultValue={'내용 : '}></TextInput>
        </ScrollView>
        <View style={[styles.grammarCheckBtnBox]}>
          <TouchableOpacity
            onPress={() => grammarCheck()}
            style={[styles.grammarCheckBtn]}>
            <Text style={[styles.btnText]}>문법체크</Text>
          </TouchableOpacity>
        </View>
      </View>
      <WordList words={temp}></WordList>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  TitleInput: {
    // borderWidth: 2,
    width: '100%',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    borderRadius: 30,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  contentInput: {
    // borderWidth: 2,
    width: '100%',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  textInputBox: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    // backgroundColor: '#5496',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5%',
  },
  dirayBox: {
    width: '80%',
    height: '55%',
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: '1.5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  wordListBox: {
    width: '70%',
    height: 'auto',
    backgroundColor: '#FFF',
    borderRadius: 30,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5%',
  },
  grammarCheckBtnBox: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grammarCheckBtn: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#FB537B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'HoonPinkpungchaR',
    width: '50%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
  },
});
