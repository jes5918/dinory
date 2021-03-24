/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import {
// Image,
// SafeAreaView,
// StyleSheet,
// ScrollView,
// View,
// Text,
// TextInput,
// StatusBar,
// Button,
// } from 'react-native';
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// components
import NavIcon from '../components/elements/NavIcon';
import WriteDiary from '../components/diary/WriteDiary';
import LoadingSec from '../components/elements/LoadingSec';
import ImageCaption from '../components/diary/ImageCaption';
import wordList from '../components/diary/WordList';
import SelectImage from '../components/diary/SelectImage';

// view
import SelectLogin from '../views/user/SelectLogin';
import SelectProfile from '../views/user/SelectProfile';
import Main from '../views/Main';
import HomeScreen from '../views/Authorization/HomeScreen';
import Login from '../views/Authorization/LoginScreen';
import Signup from '../views/Authorization/SignupScreen';
import ParentSetting from '../views/parent/ParentSetting';
import DiaryList from '../views/DiaryList/DiaryList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={NavIcon} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="SignupScreen" component={Signup} />
        <Stack.Screen name="LoadingSec" component={LoadingSec} />
        <Stack.Screen name="WriteDiary" component={WriteDiary} />
        <Stack.Screen name="SelectLogin" component={SelectLogin} />
        <Stack.Screen name="SelectProfile" component={SelectProfile} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ImageCaption" component={ImageCaption} />
        <Stack.Screen name="ParentSetting" component={ParentSetting} />
        <Stack.Screen name="wordList" component={wordList} />
        <Stack.Screen name="SelectImage" component={SelectImage} />
        <Stack.Screen name="DiaryList" component={DiaryList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

export default App;
