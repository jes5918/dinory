import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';

import CheckBox from '../elements/CheckBox.js';

export default function WriteDiary() {
  const words = [
    {textEn: 'happy', textKr: '행복'},
    {textEn: 'coding', textKr: '코딩'},
    {textEn: 'people', textKr: '사람'},
    {textEn: 'computer', textKr: '컴퓨터'},
  ];

  return (
    <KeyboardAvoidingView behavior={'heigth'} style={[styles.container]}>
      <View style={[styles.dirayBox]}>
        <TextInput></TextInput>
      </View>
      <View style={[styles.wordListBox]}>
        {words.map((word, i) => {
          return (
            <CheckBox
              textEn={word.textEn}
              textKr={word.textKr}
              key={i}></CheckBox>
          );
        })}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '2%',
  },
  dirayBox: {
    width: '70%',
    height: '50%',
    backgroundColor: '#FFF',
    borderRadius: 30,
  },
  wordListBox: {
    width: '70%',
    height: '40%',
    backgroundColor: '#FFF',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2%',
  },
});
