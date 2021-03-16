/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <View style = {styles.container}>
      <Text >Hello World</Text>
      <Image source={require('../assets/사자.png')}
      style={{width:200, height:200}}
      />

      <TextInput 
      style={{
        height:40,
        borderColor: 'grey',
        borderWidth:1
      }}
      defaultValue='YOU CAN TYPE IN ME' 
      />
    </View>
  );
};

const styles = StyleSheet.create({
 container : {
   flex :1,
   justifyContent : 'center',
   alignItems : 'center'
 }
});

export default App;
