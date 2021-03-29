import React, {useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import RoundButton from '../../components/elements/RoundButton';

export default function GrammarCheck() {
  const grammarCheck = () => {};
  const arrText = ['문', '법', '체', '크'];
  return (
    <KeyboardAvoidingView behavior={'heigth'} style={[styles.container]}>
      <View style={[styles.wrapper]}></View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  buttonPosition: {
    width: 50,
    height: 150,
    backgroundColor: '#f0859f',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIndex: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    color: '#fff',
  },
  TitleInput: {
    // borderWidth: 2,
    width: '100%',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    borderRadius: 30,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
  },
  contentInput: {
    // borderWidth: 2,
    width: '100%',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    borderRadius: 30,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  textInputBox: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    // backgroundColor: '#5496',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.5%',
  },
  dirayBox: {
    // position: 'relative',
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: '1.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 5,
    marginVertical: 15,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  wordListBox: {
    width: '70%',
    height: 'auto',
    backgroundColor: '#FFF',
    borderRadius: 30,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5%',
  },
  grammarCheckBtnBox: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grammarCheckBtn: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#FB537B',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'HoonPinkpungchaR',
    width: '50%',
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
  },
});
