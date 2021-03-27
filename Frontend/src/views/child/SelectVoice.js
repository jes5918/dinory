import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import SelectLayout from '../../components/elements/SelectLayout';
import Header from '../../components/elements/Header';

export default function SelectVoice() {
  const url = require('../../assets/images/background2.png');

  return (
    <View style={styles.container}>
      <ImageBackground source={url} style={styles.bgImage}>
        <Header />
        <View style={styles.body}>
          <SelectLayout
            title={'원하는 목소리를 선택해주세요'}
            btnText={'변경완료'}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 6,
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
