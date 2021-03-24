import React from 'react';
import {View} from 'react-native';
import CheckBox from '../../components/elements/CheckBox';
import BasicButton from '../../components/elements/BasicButton';
import RoundButton from '../../components/elements/RoundButton';
import ArrowButton from '../../components/elements/ArrowButton';

function ParentSetting(props) {
  return (
    <View>
      {/* <CheckBox></CheckBox> */}
      <BasicButton></BasicButton>
      <RoundButton></RoundButton>
      <ArrowButton></ArrowButton>
    </View>
  );
}

export default ParentSetting;
