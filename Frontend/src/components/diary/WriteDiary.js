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
  Image,
} from 'react-native';

import RoundButton from '../elements/RoundButton';
import WordList from './WordList';
import {createDiary} from '../../api/diary/writeDiary';
import MaterialIcons from 'react-native-vector-icons/AntDesign';

export default function WriteDiary({
  wordList,
  onHandleChangeTemp,
  onHandleSaveDiary,
  onHandleChangeTitle,
  onHandleChangeContent,
  onHandleCheckGrammar,
  grammarchecked,
  checkData,
  title,
  content,
}) {
  const imgIcon = require('../../assets/images/egg.png');
  const imgPerfect = require('../../assets/images/character5.png');
  const arrText = ['문', '법', '체', '크'];
  const arrText2 = ['저', '장'];
  const grammar = (
    <View style={[styles.grammarBox]}>
      {checkData && checkData.length ? (
        <Text style={[styles.text, {color: 'red'}]}>고쳐볼까요?</Text>
      ) : (
        <Text style={[styles.text, {color: 'green'}]}>완벽해요!</Text>
      )}
      {checkData && checkData.length ? (
        <ScrollView style={[styles.correctList]}>
          {checkData.map((temp, i) => {
            return (
              <View
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginVertical: screenHeight * 0.01,
                }}>
                <Image
                  source={imgIcon}
                  style={{
                    width: screenWidth * 0.02,
                    height: screenWidth * 0.02,
                    resizeMode: 'contain',
                    marginRight: screenHeight * 0.01,
                  }}></Image>
                <Text style={[styles.text, {color: 'red'}]}>{temp.text}</Text>
                <MaterialIcons
                  style={[
                    styles.text,
                    {color: 'red', marginHorizontal: screenHeight * 0.01},
                  ]}
                  name={'arrowright'}
                />
                <Text
                  style={[
                    styles.text,
                    {
                      color: 'red',
                      borderColor: 'red',
                      borderBottomWidth: 2,
                      backgroundColor: 'yellow',
                    },
                  ]}>
                  {temp.correct}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <Image
          source={imgPerfect}
          style={{
            width: screenHeight * 0.13,
            resizeMode: 'contain',
            height: screenHeight * 0.13,
            marginVertical: screenHeight * 0.01,
          }}></Image>
      )}
    </View>
  );
  return (
    <KeyboardAvoidingView behavior={'height'} style={[styles.container]}>
      <View style={[styles.wrapper]}>
        <View style={[styles.dirayBox]}>
          <ScrollView style={styles.textInputBox}>
            <View style={[styles.titleBox]}>
              <Text style={[styles.text]}>제목 :</Text>
              <TextInput
                value={title}
                style={[styles.TitleInput]}
                autoCompleteType={'off'}
                onChange={(e) => onHandleChangeTitle(e)}></TextInput>
            </View>
            <TextInput
              style={[styles.contentInput]}
              multiline
              value={content}
              autoCompleteType={'off'}
              onChange={(e) => onHandleChangeContent(e)}></TextInput>
          </ScrollView>
          {grammarchecked && grammar}
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
  grammarBox: {
    width: '40%',
    height: '100%',
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: '#FB537B',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screenHeight * 0.025,
  },
  correctList: {
    marginHorizontal: 10,
    paddingVertical: screenHeight * 0.02,
    paddingHorizontal: screenWidth * 0.017,
    width: '100%',
    paddingHorizontal: screenHeight * 0.015,
  },
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
    top: screenHeight * 0.045,
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
    fontSize: screenWidth * 0.02,
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
    height: 'auto',
    paddingBottom: 0,
    color: 'black',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: screenWidth * 0.02,
    borderBottomWidth: 2,
    borderColor: 'gray',
    paddingHorizontal: 10,
    marginBottom: 10,
    // backgroundColor: 'red',
  },
  contentInput: {
    // borderWidth: 2,
    width: '100%',
    // minHeight: screenHeight * 0.45,
    fontFamily: 'HoonPinkpungchaR',
    fontSize: screenWidth * 0.02,
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
    width: '40%',
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
  grammarCheckBox: {
    width: '35%',
    height: '100%',
    backgroundColor: 'red',
  },
});
