import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';

export default function NavIcon({navigation}) {
  return (
    <ScrollView>
      <Text>NavIcon 테스트</Text>
      <Button
        title="HomeScreen"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      <Button
        title="EmailAuthorization"
        onPress={() => navigation.navigate('EmailAuthorization')}
      />
      <Button
        title="LoginScreen"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="SignupScreen"
        onPress={() => navigation.navigate('Singup')}
      />
      <Button
        title="LoadingSec"
        onPress={() => navigation.navigate('LoadingSec')}
      />
      <Text> </Text>
      <Button
        title="SelectLogin"
        onPress={() => navigation.navigate('SelectLogin')}
      />
      <Text> </Text>
      <Button
        title="SelectProfile"
        onPress={() => navigation.navigate('SelectProfile')}
      />
      <Text> </Text>
      <Button title="Main" onPress={() => navigation.navigate('Main')} />
      <Text> </Text>
      <Button
        title="ImageCaption"
        onPress={() => navigation.navigate('ImageCaption')}
      />
      <Text> </Text>
      <Button
        title="WriteDiary"
        onPress={() => navigation.navigate('WriteDiary')}
      />
      <Text> </Text>
      <Button
        title="ParentSetting"
        onPress={() => navigation.navigate('ParentSetting')}
      />
      <Text> </Text>
      <Button
        title="wordList"
        onPress={() => navigation.navigate('wordList')}
      />
      <Text> </Text>
      <Button
        title="SelectImage"
        onPress={() => navigation.navigate('SelectImage')}
      />
      <Text> </Text>
      <Button
        title="DiaryList"
        onPress={() => navigation.navigate('DiaryList')}
      />
    </ScrollView>
  );
}
