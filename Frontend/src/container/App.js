/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// components
import NavIcon from '../components/elements/NavIcon';
// import WriteDiary from '../components/diary/WriteDiary';
import LoadingSec from '../components/elements/LoadingSec';
import ImageCaption from '../components/diary/ImageCaption';
import SelectImage from '../components/diary/SelectImage';
import SelectLayout from '../components/elements/SelectLayout';
import GrammarCheck from '../components/diary/GrammarCheck';

// view
import Main from '../views/Main';
import HomeScreen from '../views/user/HomeScreen';
import SignupScreen from '../views/user/SignupScreen';
import EmailAuthorization from '../views/user/EmailAuthorization';
import PinCreate from '../views/user/PinScreen';
import CreateProfile from '../views/user/profile/CreateProfile';
import SelectProfile from '../views/user/profile/SelectProfile';
import NameProfile from '../views/user/profile/NameProfile';
import AgeProfile from '../views/user/profile/AgeProfile';
import AvatarProfile from '../views/user/profile/AvatarProfile';

import DiaryList from '../views/diaryList/DiaryList';
import ParentSetting from '../views/parent/ParentSetting';
import SelectVoice from '../views/child/SelectVoice';
import MainTutorial from '../views/MainTutorial';
import ChildSetting from '../views/child/ChildSetting';
import Diary from '../views/diary/Diary';
import Word from '../views/word/Word';
import WordByAlphabet from '../views/word/WordByAlphabet';
import DiaryWriteTutorial from '../views/diary/DiaryWriteTutorial';
import LoginScreen from '../views/user/LoginScreen';
import DiaryDetail from '../views/diaryList/DiaryDetail';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={NavIcon} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="EmailAuthorization"
          component={EmailAuthorization}
        />
        <Stack.Screen name="LoadingSec" component={LoadingSec} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="PinScreen" component={PinCreate} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
        <Stack.Screen name="SelectProfile" component={SelectProfile} />
        <Stack.Screen name="NameProfile" component={NameProfile} />
        <Stack.Screen name="AgeProfile" component={AgeProfile} />
        <Stack.Screen name="AvatarProfile" component={AvatarProfile} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ImageCaption" component={ImageCaption} />
        <Stack.Screen name="ParentSetting" component={ParentSetting} />
        <Stack.Screen name="SelectImage" component={SelectImage} />
        <Stack.Screen name="DiaryList" component={DiaryList} />
        <Stack.Screen name="SelectVoice" component={SelectVoice} />
        <Stack.Screen name="SelectLayout" component={SelectLayout} />
        <Stack.Screen name="MainTutorial" component={MainTutorial} />
        <Stack.Screen name="GrammarCheck" component={GrammarCheck} />
        <Stack.Screen name="ChildSetting" component={ChildSetting} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="Word" component={Word} />
        <Stack.Screen name="WordByAlphabet" component={WordByAlphabet} />
        <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="DiaryWriteTutorial "
          component={DiaryWriteTutorial}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
