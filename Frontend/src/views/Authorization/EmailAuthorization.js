import React, {Component} from 'react';
import {StyleSheet, Text, Button, View, TextInput} from 'react-native';

export default function EmailAuthorization() {
  return (
    <View style={styles.container}>
      <Text> 이메일 인증 페이지</Text>
      <TextInput placeholder={'이메일을 입력하세요'} />
      <TextInput placeholder={'핀 번호 인증'} />
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
