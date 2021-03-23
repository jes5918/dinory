import React, {Component} from 'react';
import {StyleSheet, Text, Button, View, TextInput} from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text> 로그인 페이지</Text>
      <TextInput placeholder={'이메일'} />
      <TextInput placeholder={'비밀번호'} />
      <Button title="로그인"></Button>
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
