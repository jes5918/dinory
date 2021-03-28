import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import CheckBox from '../../components/elements/CheckBox';
import BasicButton from '../../components/elements/BasicButton';
import RoundButton from '../../components/elements/RoundButton';
import ArrowButton from '../../components/elements/ArrowButton';

function ParentSetting(props) {
  return (
    <View style={styles.container}>
      {/* <CheckBox></CheckBox> */}
      {/* <BasicButton></BasicButton>
      <RoundButton></RoundButton>
      <ArrowButton></ArrowButton> */}
      <Image
        source={{
          uri:
            'https://mblogthumb-phinf.pstatic.net/20160316_188/machsz_1458108041064UOBNl_JPEG/22.jpg?type=w2',
        }}
      />
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
