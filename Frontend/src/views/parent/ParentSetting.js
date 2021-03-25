import React from 'react';
import {View, StyleSheet} from 'react-native';
import CheckBox from '../../components/elements/CheckBox';
import BasicButton from '../../components/elements/BasicButton';
import RoundButton from '../../components/elements/RoundButton';
import ArrowButton from '../../components/elements/ArrowButton';

function ParentSetting(props) {
  return (
    <View style={styles.container}>
      {/* <CheckBox></CheckBox> */}
      <BasicButton></BasicButton>
      <RoundButton></RoundButton>
      <ArrowButton></ArrowButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightcoral',
  },
});

export default ParentSetting;
