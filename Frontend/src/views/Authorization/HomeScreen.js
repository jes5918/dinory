import React, {Component} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';

export default function HomeScreen(props) {
  const {navigate} = props.navigation;
  return (
    <View style={styles.container}>
      <Button
        title="회원가입"
        onPress={() => navigate('SignupScreen')}></Button>
      <Button title="로그인" onPress={() => navigate('LoginScreen')}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
