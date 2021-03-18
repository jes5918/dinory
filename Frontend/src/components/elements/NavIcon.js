import React from 'react';
import {View, Text, Button} from 'react-native';

export default function NavIcon({navigation}) {
  return (
    <View>
      <Text>NavIcon 테스트</Text>
      <Button
        title="LoadingFir"
        onPress={() => navigation.navigate('LoadingFir')}
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
    </View>
  );
}