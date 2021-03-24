import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {HomeScreen} from '../../container/Authorization/HomeScreen';
// import EmailAuthorization from '../../container/Authorization/EmailAuthorization';
// import Login from '../../container/Authorization/LoginScreen';
// import PinCreate from '../../container/Authorization/PinScreen';
// import Signup from '../../container/Authorization/';
export default function SelectLogin() {
  return (
    <View style={styles.container}>
      {/* <HomeScreen></HomeScreen> */}
      {/* <EmailAuthorization />
      <Login />
      <PinCreate />
      <Signup /> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
