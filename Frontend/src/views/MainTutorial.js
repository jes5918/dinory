import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {useNavigation} from '@react-navigation/core';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const slides = [
  {
    key: 'one',
    image: require('../assets/images/tutorial/main1.png'),
  },
  {
    key: 'two',
    image: require('../assets/images/tutorial/main2.png'),
  },
  {
    key: 'three',
    image: require('../assets/images/tutorial/main3.png'),
  },
  {
    key: 'four',
    image: require('../assets/images/tutorial/main4.png'),
  },
];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'stretch',
  },
});

const renderItem = ({item}) => {
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
    </View>
  );
};

export default function MainTutorial() {
  const navigation = useNavigation();

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      showSkipButton
      onDone={() => navigation.navigate('Main')}
      dotClickEnabled
    />
  );
}
