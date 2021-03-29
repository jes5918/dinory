import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import SelectLayout from '../../../components/elements/SelectLayout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
export default function SelectProfile({navigation}) {
  const imageSrc = require('../../../assets/images/background2.png');

  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <SelectLayout title={'프로필 선택'}></SelectLayout>
    </BackgroundAbsolute>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
