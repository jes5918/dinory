import React, {useState, useCallback, useMemo} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getWordDetail} from '../../api/word/readWord';
import {useFocusEffect} from '@react-navigation/core';
import Sound from 'react-native-sound';

//  english : 영어 단어, korean: 뜻, pos(part of speech): 품사
export default function FlipCard({english, korean, pos, voiceNum}) {
  const animationvalue = useMemo(() => new Animated.Value(0), []);
  const [wordDetail, setWordDetail] = useState();
  const [child, setChild] = useState('');
  let temp = 0;

  animationvalue.addListener((e) => {
    temp = e.value;
  });

  // const getProfileInfo = useCallback(async () => {
  //   await AsyncStorage.getItem('profile').then((profile) => {
  //     const data = JSON.parse(profile);
  //     setChild(data.profile_pk);
  //   });
  // }, []);

  // useEffect(() => {
  //   getProfileInfo();
  // }, [getProfileInfo]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('profile').then((profile) => {
        const data = JSON.parse(profile);
        setChild(data.profile_pk);
      });
    }, []),
  );

  const frontflipRange = animationvalue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backflipRange = animationvalue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const transformFront = {
    transform: [{rotateY: frontflipRange}],
  };

  const transformBack = {
    transform: [{rotateY: backflipRange}],
  };

  const baseUrl = 'https://j4b105.p.ssafy.io/api';
  const sound = new Sound(
    baseUrl +
      '/media/tts_basic/' +
      `${String(voiceNum)}` +
      `${english}` +
      '.wav',
    Sound.MAIN_BUNDLE,
    (error) => {},
  );

  const flip = useCallback(() => {
    sound.stop(() => {
      sound.play();
    });
    if (temp < 90) {
      getWordDetail(
        {child: child, word: english},
        (res) => {
          let result = res.data.sentence;
          let selectedResult = result.replace('<b>', '').replace('</b>', '');
          setWordDetail(() => selectedResult);
        },
        (err) => {},
      );
      Animated.timing(animationvalue, {
        toValue: 180,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animationvalue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
    return sound.stop();
  }, [temp, animationvalue, english, child]);

  return (
    <TouchableOpacity
      style={[styles.card]}
      onPress={() => flip()}
      activeOpacity={1}>
      <Animated.View style={[transformFront, styles.front]}>
        <Text style={[styles.word]}>{english}</Text>
      </Animated.View>
      <Animated.View style={[transformBack, styles.back]}>
        <View style={[styles.backWordBox]}>
          <Text style={[styles.word]}>{korean}</Text>
          <Text style={[styles.wordClass]}>{pos}</Text>
        </View>
        <View style={styles.backSentenceBox}>
          <Text style={[styles.wordSentence]}>{wordDetail}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;
const screenHeight = dimensions.height;
const cardWidth = screenWidth * 0.2;
const cardHeight = screenHeight * 0.4;

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: 'transparent',
    width: cardWidth,
    height: cardHeight,
    elevation: 5,
  },
  front: {
    position: 'absolute',
    width: cardWidth,
    height: cardHeight,
    backgroundColor: '#f0859f',
    backfaceVisibility: 'hidden',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  back: {
    position: 'absolute',
    width: cardWidth,
    height: cardHeight,
    backgroundColor: '#76b0e9',
    backfaceVisibility: 'hidden',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'column',
    padding: '5%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  word: {
    fontSize: cardWidth * 0.15,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'HoonPinkpungchaR',
    textAlign: 'center',
  },
  wordClass: {
    fontSize: cardWidth * 0.1,
    color: 'white',
    fontFamily: 'HoonPinkpungchaR',
  },
  wordSentence: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: cardWidth * 0.08,
    fontWeight: '500',
  },
  backWordBox: {
    width: '100%',
    height: '45%',
    display: 'flex',
    padding: cardHeight * 0.05,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  backSentenceBox: {
    width: '100%',
    height: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: cardWidth * 0.06,
  },
});
