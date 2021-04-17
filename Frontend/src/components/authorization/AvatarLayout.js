import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import DinoButton from '../elements/DinoButton';

const dimensions = Dimensions.get('window');
const width = dimensions.width;

export default function AvatarLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.selectDino}>
        <DinoButton
          imgSrc={require('../../assets/images/character1.png')}
          widthProps={width * 0.08}
        />
        <DinoButton
          imgSrc={require('../../assets/images/character2.png')}
          widthProps={width * 0.08}
        />
        <DinoButton
          imgSrc={require('../../assets/images/character3.png')}
          widthProps={width * 0.08}
        />
        <DinoButton
          imgSrc={require('../../assets/images/character4.png')}
          widthProps={width * 0.08}
        />
        <DinoButton
          imgSrc={require('../../assets/images/character5.png')}
          widthProps={width * 0.08}
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
