import React, {Component} from 'react';
import {StyleSheet, Text, Button, View, ImageBackground} from 'react-native';
import Layout from '../../components/elements/layout';
export default function HomeScreen(props) {
  const {navigate} = props.navigation;
  return (
    <ImageBackground
      source={require('../../assets/images/background5.png')}
      layout
      style={styles.container}>
      <Layout width={500} height={500} opacity={0.4}>
        <Button
          title="회원가입"
          onPress={() => navigate('EmailAuthorization')}></Button>
        <Button title="로그인" onPress={() => navigate('LoginScreen')}></Button>
      </Layout>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
