import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import SelectLayout from '../../components/elements/SelectLayout';
import Header from '../../components/elements/Header';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';

const dimensions = Dimensions.get('window');
const height = dimensions.height;

export default function SelectVoice() {
  const url = require('../../assets/images/background2.png');

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={url}>
        <Header />
        <View style={styles.body}>
          <SelectLayout
            title={'원하는 목소리를 선택해주세요'}
            btnText={'변경완료'}
          />
        </View>
      </BackgroundAbsolute>
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
    marginTop: height * 0.17,
  },
});
