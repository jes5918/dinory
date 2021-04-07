import React from 'react';
import Layout from './Layout';
import BasicButton from './BasicButton';
import RoundButton from './RoundButton';
import DinoButton from './DinoButton';
import ContentTitle from './ContentTitle';
import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function SelectLayout({
  title, // 제목
  onHandlePressC1, // 캐릭터 1 선택시 이벤트
  onHandlePressC2, // 캐릭터 2 선택시 이벤트
  onHandlePressC3, // 캐릭터 3 선택시 이벤트
  onHandlePressC4, // 캐릭터 4 선택시 이벤트
  onHandlePressC5, // 캐릭터 5 선택시 이벤트
  arrow, // true일 경우 arrow버튼 생성, 없을 경우 basic 버튼 생성
  onHandlePressArrow, // arrow 버튼 이벤트
  btnText, // basic 버튼 문구
  onHandlePressBasic, // basic 버튼 이벤트
  imgNumber,
}) {
  const character1 = require('../../assets/images/character1.png');
  const character2 = require('../../assets/images/character2.png');
  const character3 = require('../../assets/images/character3.png');
  const character4 = require('../../assets/images/character4.png');
  const character5 = require('../../assets/images/character5.png');

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ContentTitle title={title} />
        <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
          <View style={styles.crownWrapper}>
            {imgNumber === 0 ? (
              <Image
                style={styles.crownImage}
                source={require('../../assets/images/crown.png')}
              />
            ) : (
              <View style={styles.null}></View>
            )}
            {imgNumber === 1 ? (
              <Image
                style={styles.crownImage}
                source={require('../../assets/images/crown.png')}
              />
            ) : (
              <View style={styles.null}></View>
            )}
            {imgNumber === 2 ? (
              <Image
                style={styles.crownImage}
                source={require('../../assets/images/crown.png')}
              />
            ) : (
              <View style={styles.null}></View>
            )}
            {imgNumber === 3 ? (
              <Image
                style={styles.crownImage}
                source={require('../../assets/images/crown.png')}
              />
            ) : (
              <View style={styles.null}></View>
            )}
            {imgNumber === 4 ? (
              <Image
                style={styles.crownImage}
                source={require('../../assets/images/crown.png')}
              />
            ) : (
              <View style={styles.null}></View>
            )}
          </View>
          <View style={styles.innerMiddle}>
            <DinoButton imgSrc={character1} onHandlePress={onHandlePressC1} />
            <DinoButton imgSrc={character2} onHandlePress={onHandlePressC2} />
            <DinoButton imgSrc={character3} onHandlePress={onHandlePressC3} />
            <DinoButton imgSrc={character4} onHandlePress={onHandlePressC4} />
            <DinoButton imgSrc={character5} onHandlePress={onHandlePressC5}>
              <View style={styles.betaIcon}>
                <Text style={styles.betaText}>Beta</Text>
              </View>
            </DinoButton>
          </View>
          <View style={styles.innerLower}>
            {arrow ? (
              <RoundButton arrow={true} onHandlePress={onHandlePressArrow} />
            ) : (
              <BasicButton
                text={`${btnText}`}
                btnWidth={width * 0.26}
                onHandlePress={onHandlePressBasic}
              />
            )}
          </View>
        </Layout>
      </View>
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
  innerUpper: {},
  innerMiddle: {
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerLower: {
    flex: 4,
    justifyContent: 'flex-start',
  },
  crownWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 2,
  },
  crownImage: {
    width: width * 0.13,
    height: height * 0.13,
    marginTop: height * 0.1,
  },
  null: {
    width: width * 0.13,
    height: height * 0.13,
  },
  betaIcon: {
    backgroundColor: '#fff',
    opacity: 0.5,
    borderRadius: 20,
    paddingHorizontal: 5,
    flexWrap: 'wrap',
    display: 'flex',
    marginTop: height * -0.02,
  },
  betaText: {
    fontSize: height * 0.03,
    fontFamily: 'HoonPinkpungchaR',
  },
});
