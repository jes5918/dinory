import React, {Component} from 'react';
import {StyleSheet, Text, Button, View, TextInput} from 'react-native';

export default function Singup() {
  return (
    <View style={styles.container}>
      <Text> 회원가입 페이지</Text>
      <TextInput placeholder={'이메일을 입력해주세요'} />
      <TextInput placeholder={'비밀번호를 입력해주세요'} />
      <Text>
        * 비밀번호는 대소문자(영어), 숫자 조합 8자리로 구성되어야 합니다
      </Text>
      <TextInput placeholder={'비밀번호를 한 번 더 입력해주세요'} />
      <Button title="회원가입"></Button>
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
