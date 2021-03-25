import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Layout from './Layout';
import BasicButton from './BasicButton';
import RoundButton from './RoundButton';
import DinoButton from './DinoButton';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function SelectLayout({title, arrow, btnText}) {
  const character1 = require('../../assets/images/character1.png');
  const character2 = require('../../assets/images/character2.png');
  const character3 = require('../../assets/images/character3.png');
  const character4 = require('../../assets/images/character4.png');
  const character5 = require('../../assets/images/character5.png');

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
          <View sytle={styles.innerUpper}></View>
          <View style={styles.innerMiddle}>
            <DinoButton imgSrc={character1} />
            <DinoButton imgSrc={character2} />
            <DinoButton imgSrc={character3} />
            <DinoButton imgSrc={character4} />
            <DinoButton imgSrc={character5} />
          </View>
          <View style={styles.innerLower}>
            {arrow ? (
              <RoundButton
                arrow={true}
                // onHandlePress={() =>}
              />
            ) : (
              <BasicButton text={`${btnText}`} btnWidth={width * 0.26} />
            )}
          </View>
        </Layout>
      </View>
    </View>
  );
}

// 목소리 변경
// const changeVoice=()=>{
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  body: {
    flex: 6,
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  innerUpper: {},
  innerMiddle: {
    flex: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerLower: {
    flex: 3,
    justifyContent: 'flex-start',
  },
  titleContainer: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: width * 0.4,
    height: height * 0.1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: height * 0.04,
    fontFamily: 'HoonPinkpungchaR',
  },
});
