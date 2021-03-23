import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CheckBox from '../elements/CheckBox.js';

export default function WriteDiary({words}) {
  return (
    <View style={[styles.wordListBox]}>
      {words &&
        words.map((word, i) => {
          return (
            <CheckBox
              textEn={word.textEn}
              textKr={word.textKr}
              key={i}></CheckBox>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
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
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});
