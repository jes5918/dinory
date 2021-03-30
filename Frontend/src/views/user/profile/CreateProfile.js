import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import Layout from '../../../components/elements/Layout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ContentTitle from '../../../components/elements/ContentTitle';
import HoonPinkText from '../../../components/elements/HoonPinkText';
import PlusProfileButton from '../../../components/authorization/PlusProfileButton';
import ArrowButton from '../../../components/elements/ArrowButton';
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
export default function CreateProfile({navigation}) {
  const imageSrc = require('../../../assets/images/background2.png');
  const next = () => {
    navigation.navigate('NameProfile');
  };
  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <View style={styles.start}>
        <View>
          <ArrowButton onHandlePress={() => navigation.goBack()}></ArrowButton>
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}></Image>
        </View>
      </View>
      <View style={styles.body}>
        <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
          <ContentTitle title={'프로필 생성'} opacity={0.1}></ContentTitle>
          <PlusProfileButton
            onHandlePress={() => {
              next();
            }}></PlusProfileButton>
          <HoonPinkText fontSize={32}>
            프로필을 추가하려면 버튼을 누르세요
          </HoonPinkText>
        </Layout>
      </View>
      <View stlye={styles.end}></View>
    </BackgroundAbsolute>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    flex: 1.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
  body: {
    flex: 6,
  },
  end: {
    flex: 1,
  },
});
