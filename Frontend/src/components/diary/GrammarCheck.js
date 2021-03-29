import React, {useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import RoundButton from '../../components/elements/RoundButton';
import Sound from 'react-native-sound';

// const audioURL = 'http://j4b105.p.ssafy.io/media/tts_basic/button-1.mp3';
const audioURL = require('../../assets/Wellcometodinory.wav');

export default function GrammarCheck() {
  let whoosh = new Sound(audioURL, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
    }
    console.log('아무거나찍자');
    // loaded successfully
    // console.log(
    //   'duration in seconds: ' +
    //     whoosh.getDuration() +
    //     'number of channels: ' +
    //     whoosh.getNumberOfChannels(),
    // );

    // // Play the sound with an onEnd callback
    // whoosh.play((success) => {
    //   if (success) {
    //     console.log('successfully finished playing');
    //   } else {
    //     console.log('playback failed due to audio decoding errors');
    //   }
    // });
  });

  // let music = new Sound(audioURL, null, (error) => {
  //   if (error) {
  //     console.log(error);
  //   }
  // });
  return (
    <View style={styles.container}>
      <Button
        title={'재생'}
        onPress={() => {
          whoosh.play();
        }}
        name={'controller-play'}
        size={40}
      />
      <Button
        title={'일시정지'}
        onPress={() => {
          whoosh.pause();
        }}
        name={'controller-paus'}
        size={40}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightgrey',
    opacity: 0.3,
    flexDirection: 'row',
  },
});
