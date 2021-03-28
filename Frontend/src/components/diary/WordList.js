import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CheckBox from '../elements/CheckBox.js';

export default function WriteDiary({words}) {
  const selectWord = () => {
    alert('단어가 췤췤');
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
              textEn={word.name}
              textKr={word.mean}
              onHandleVolume={() => wordSound()}
              onHandleCheck={() => selectWord()}
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
