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
import NavIcon from '../components/elements/NavIcon';
import FlipCard from '../components/elements/FlipCard';
import LoadingFir from '../components/LoadingFir';
import SelectLogin from '../views/user/SelectLogin';
import SelectProfile from '../views/SelectProfile';
import Main from '../views/Main';
import ImageCaption from '../views/diary/ImageCaption';
import WriteDiary from '../views/diary/WriteDiary';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FlipCard">
        <Stack.Screen name="Home" component={NavIcon} />
        <Stack.Screen name="LoadingFir" component={LoadingFir} />
        <Stack.Screen name="FlipCard" component={FlipCard} />
        <Stack.Screen name="SelectLogin" component={SelectLogin} />
        <Stack.Screen name="SelectProfile" component={SelectProfile} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="ImageCaption" component={ImageCaption} />
        <Stack.Screen name="WriteDiary" component={WriteDiary} />
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
