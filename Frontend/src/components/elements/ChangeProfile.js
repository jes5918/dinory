import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import DinoButton from './DinoButton';

const dimensions = Dimensions.get('window');
const width = dimensions.width;

export default function ChangeProfile(props) {
  return (
    <View style={styles.container}>
      <View style={styles.selectDino}>
        <DinoButton
          imgSrc={require('../../assets/images/character1.png')}
          widthProps={width * 0.08}
          onHandlePress={() => {
            props.setDinoPicNum(1);
          }}
        />
        <DinoButton
          imgSrc={require('../../assets/images/character2.png')}
          widthProps={width * 0.08}
          onHandlePress={() => {
            props.setDinoPicNum(2);
          }}
        />
        <DinoButton
          imgSrc={require('../../assets/images/character3.png')}
          widthProps={width * 0.08}
          onHandlePress={() => {
            props.setDinoPicNum(3);
          }}
        />
      </View>
      <View style={styles.selectDino}>
        <DinoButton
          imgSrc={require('../../assets/images/character4.png')}
          widthProps={width * 0.08}
          onHandlePress={() => {
            props.setDinoPicNum(4);
          }}
        />
        <DinoButton
          imgSrc={require('../../assets/images/character5.png')}
          widthProps={width * 0.08}
          onHandlePress={() => {
            props.setDinoPicNum(5);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  selectDino: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
