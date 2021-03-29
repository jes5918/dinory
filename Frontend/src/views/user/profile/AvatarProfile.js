import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Layout from '../../../components/elements/Layout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ContentTitle from '../../../components/elements/ContentTitle';
import HoonPinkText from '../../../components/elements/HoonPinkText';
import ArrowProfileButton from '../../../components/authorization/ArrowProfileButton';
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
export default function AvatarProfile({navigation}) {
  const imageSrc = require('../../../assets/images/background2.png');
  const next = () => {
    navigation.navigate('SelectProfile');
  };
  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <ContentTitle title={'아바타를 선택하세요'}></ContentTitle>
      <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
        <HoonPinkText fontSize={20}>아바타를 선택하세요 </HoonPinkText>
        <ArrowProfileButton
          onHandlePress={() => {
            next();
          }}></ArrowProfileButton>
      </Layout>
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
