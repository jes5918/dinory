import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CheckBox from '../elements/CheckBox.js';

export default function WriteDiary({words, onHandleChangeTemp}) {
  const selectWord = (i) => {
    const aaa = words.map((word, idx) => {
      if (i === idx) {
        console.log('!!!!!!!!', word);
        return {...word, checked: !word.checked};
      } else {
        return word;
      }
    });

    onHandleChangeTemp(aaa);
    console.log('word변화', aaa);
  };
  return (
    <View style={[styles.wordListBox]}>
      {words &&
        words.map((word, i) => {
          return (
            <CheckBox
              soundUrl={word.filepath}
              textEn={word.content}
              textKr={word.mean}
              ischecked={word.checked}
              onHandleCheck={() => selectWord(i)}
              key={i}></CheckBox>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  wordListBox: {
    width: '80%',
    height: 'auto',
    backgroundColor: '#FFF',
    borderRadius: 30,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.5%',
    elevation: 5,
  },
});
