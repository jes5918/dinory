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
import Sound from 'react-native-sound';
import BGM from '../assets/sound/BunnyHopQuincasMoreira.mp3';

// components
import NavIcon from '../components/elements/NavIcon';
// import WriteDiary from '../components/diary/WriteDiary';
import LoadingSec from '../components/elements/LoadingSec';
import ImageCaption from '../components/diary/ImageCaption';
import SelectImage from '../components/diary/SelectImage';
import SelectLayout from '../components/elements/SelectLayout';
// import GrammarCheck from '../components/diary/GrammarCheck';

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

import DiaryList from '../views/diaryList/DiaryList';
import ParentSetting from '../views/parent/ParentSetting';
import SelectVoice from '../views/child/SelectVoice';
import MainTutorial from '../views/MainTutorial';
import ChildSetting from '../views/child/ChildSetting';
import Diary from '../views/diary/Diary';
import Word from '../views/word/Word';
import WordByAlphabet from '../views/word/WordByAlphabet';
import DiaryWriteTutorial from '../views/diary/DiaryWriteTutorial';
import DiaryDetail from '../views/diaryList/DiaryDetail';
import PassWordUpdate from '../views/parent/PassWordUpdate';
import PinUpdate from '../views/parent/PinUpdate';
import PinAuthentication from '../views/parent/PinAuthentication';

const Stack = createStackNavigator();

const App = () => {
  // 배경음
  useEffect(() => {
    return () => {
      sound.release();
      sound.pause();
    };
  });
  let sound = new Sound(BGM, (error) => {
    sound.setVolume(0.1);
    sound.play();
    sound.setNumberOfLoops(-1);
  });
  // let [soundSetting, setSoundSetting] = useState(true);

  // 배경음 Mute/Play 2차 배포 개발 예정
  // let [soundSetting, setSoundSetting] = useState(true);
  // if (soundSetting) {
  //   sound.play();
  //   console.log(soundSetting);
  // } else {
  //   sound.pause();
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={NavIcon} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="EmailAuthorization"
          component={EmailAuthorization}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="LoadingSec" component={LoadingSec} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="PinScreen" component={PinCreate} />
        <Stack.Screen name="SelectProfile" component={SelectProfile} />
        <Stack.Screen name="NameProfile" component={NameProfile} />
        <Stack.Screen name="AgeProfile" component={AgeProfile} />
        <Stack.Screen name="AvatarProfile" component={AvatarProfile} />
        <Stack.Screen name="SearchPassword" component={SearchPassword} />
        <Stack.Screen name="ModifyPassword" component={ModifyPassword} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ImageCaption" component={ImageCaption} />
        <Stack.Screen name="ParentSetting" component={ParentSetting} />
        <Stack.Screen name="SelectImage" component={SelectImage} />
        <Stack.Screen name="DiaryList" component={DiaryList} />
        <Stack.Screen name="SelectVoice" component={SelectVoice} />
        <Stack.Screen name="SelectLayout" component={SelectLayout} />
        <Stack.Screen name="MainTutorial" component={MainTutorial} />
        <Stack.Screen name="ChildSetting" component={ChildSetting} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="Word" component={Word} />
        <Stack.Screen name="WordByAlphabet" component={WordByAlphabet} />
        <Stack.Screen name="DiaryDetail" component={DiaryDetail} />
        <Stack.Screen
          name="DiaryWriteTutorial"
          component={DiaryWriteTutorial}
        />
        <Stack.Screen name="PassWordUpdate" component={PassWordUpdate} />
        <Stack.Screen name="PinUpdate" component={PinUpdate} />
        <Stack.Screen name="PinAuthentication" component={PinAuthentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
