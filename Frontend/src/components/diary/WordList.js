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
  const wordSound = () => {
    alert('단어를 잘 들어보세요 호호');
  };
  return (
    <View style={[styles.wordListBox]}>
      {words &&
        words.map((word, i) => {
          return (
            <CheckBox
              textEn={word.content}
              textKr={word.mean}
              ischecked={word.checked}
              onHandleVolume={() => wordSound()}
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
