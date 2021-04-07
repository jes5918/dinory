/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// components
import LoadingSec from '../components/elements/LoadingSec';
import SelectLayout from '../components/elements/SelectLayout';

// view
import Main from '../views/Main';
import HomeScreen from '../views/user/HomeScreen';
import SignupScreen from '../views/user/SignupScreen';
import LoginScreen from '../views/user/LoginScreen';
import EmailAuthorization from '../views/user/EmailAuthorization';
import PinCreate from '../views/user/PinScreen';
import SelectProfile from '../views/user/profile/SelectProfile';
import NameProfile from '../views/user/profile/NameProfile';
import AgeProfile from '../views/user/profile/AgeProfile';
import AvatarProfile from '../views/user/profile/AvatarProfile';
import SearchPassword from '../views/user/SearchPassword';
import ModifyPassword from '../views/user/ModifyPassword';
import ExamineDiaryList from '../views/parent/ExamineDiaryList';
import ExamineDiaryDetail from '../views/parent/ExamineDiaryDetail';

import DiaryList from '../views/diaryList/DiaryList';
import ParentSetting from '../views/parent/ParentSetting';
import SelectVoice from '../views/child/SelectVoice';
import MainTutorial from '../views/MainTutorial';
import ChildSetting from '../views/child/ChildSetting';
import Diary from '../views/diary/Diary';
import DiaryMainTutorial from '../views/diary/DiaryMainTutorial';
import Word from '../views/word/Word';
import WordByAlphabet from '../views/word/WordByAlphabet';
import DiaryDetail from '../views/diaryList/DiaryDetail';
import PassWordUpdate from '../views/parent/PassWordUpdate';
import PinUpdate from '../views/parent/PinUpdate';
import PinAuthentication from '../views/parent/PinAuthentication';
import DiaryChart from '../views/parent/DiaryChart';

import Sound from 'react-native-sound';
import BGM from '../assets/sound/rockabyebaby.mp3';

const Stack = createStackNavigator();

let sound = new Sound(BGM, () => {});

const App = () => {
  useEffect(() => {
    return () => {
      sound.stop();
      sound.pause();
    };
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" headerMode="none">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="EmailAuthorization"
          component={EmailAuthorization}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoadingSec" component={LoadingSec} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="PinScreen" component={PinCreate} />
        <Stack.Screen
          name="SelectProfile"
          component={SelectProfile}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen name="NameProfile" component={NameProfile} />
        <Stack.Screen name="AgeProfile" component={AgeProfile} />
        <Stack.Screen name="AvatarProfile" component={AvatarProfile} />
        <Stack.Screen name="SearchPassword" component={SearchPassword} />
        <Stack.Screen name="ModifyPassword" component={ModifyPassword} />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen name="ParentSetting" component={ParentSetting} />
        <Stack.Screen name="DiaryList" component={DiaryList} />
        <Stack.Screen name="SelectVoice" component={SelectVoice} />
        <Stack.Screen name="SelectLayout" component={SelectLayout} />
        <Stack.Screen name="MainTutorial" component={MainTutorial} />
        <Stack.Screen name="ChildSetting" component={ChildSetting} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="Word" component={Word} />
        <Stack.Screen name="WordByAlphabet" component={WordByAlphabet} />
        <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
        <Stack.Screen name="PassWordUpdate" component={PassWordUpdate} />
        <Stack.Screen name="PinUpdate" component={PinUpdate} />
        <Stack.Screen name="PinAuthentication" component={PinAuthentication} />
        <Stack.Screen name="DiaryMainTutorial" component={DiaryMainTutorial} />
        <Stack.Screen name="DiaryChart" component={DiaryChart} />
        <Stack.Screen name="ExamineDiaryList" component={ExamineDiaryList} />
        <Stack.Screen
          name="ExamineDiaryDetail"
          component={ExamineDiaryDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
