import React from 'react';
import {Text, Button, ScrollView} from 'react-native';

export default function NavIcon({navigation}) {
  return (
    <ScrollView>
      <Text>NavIcon 테스트</Text>
      <Button
        title="HomeScreen"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      <Text> </Text>
      <Button
        title="SelectProfile"
        onPress={() => navigation.navigate('SelectProfile')}
      />
      <Text> </Text>
      <Button
        title="LoadingSec"
        onPress={() => navigation.navigate('LoadingSec')}
      />
      <Text> </Text>
      <Button title="Main" onPress={() => navigation.navigate('Main')} />
      <Text> </Text>
      <Button
        title="ParentSetting"
        onPress={() => navigation.navigate('ParentSetting')}
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
      <Text> </Text>
      <Button title="Diary" onPress={() => navigation.navigate('Diary')} />
    </ScrollView>
  );
}
