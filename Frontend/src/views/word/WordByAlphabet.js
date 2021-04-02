import React, {useState, useEffect, useCallback} from 'react';
import Header from '../../components/elements/Header';
import FlipCard from '../../components/elements/FlipCard';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/core';
import {getListbyAlphabet} from '../../api/word/readWord';
import {StyleSheet, View, Dimensions, ScrollView, Text} from 'react-native';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function WordByAlphabet({route}) {
  const url = require('../../assets/images/background1.png');
  const alphabet = route.params.selectAlpha;
  const [listByAlpha, setListByAlpha] = useState();
  const [child, setChild] = useState('');
  const [voiceNum, setVoiceNum] = useState('');

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('profile').then((profile) => {
        const data = JSON.parse(profile);
        setChild(data.profile_pk);
        setVoiceNum(data.voice_pk);
      });
    }, []),
  );

  useEffect(() => {
    if (child && alphabet) {
      getListbyAlphabet(
        {child: child, alphabet: alphabet},
        (res) => {
          setListByAlpha(() => res.data);
        },
        (err) => {},
      );
    }
  }, [child, alphabet]);

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={url}>
        <Header>
          <Text style={styles.headerTitle}>카드를 눌러보세요!</Text>
        </Header>
        <View style={styles.body}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {listByAlpha &&
              listByAlpha.map((props) => {
                return (
                  <View style={styles.cardContainer} key={props.id}>
                    <FlipCard
                      english={props.content}
                      korean={props.mean}
                      pos={props.part}
                      voiceNum={voiceNum}
                    />
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </BackgroundAbsolute>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'HoonPinkpungchaR',
    color: '#fff',
    fontSize: height * 0.05,
    alignSelf: 'flex-end',
  },
  body: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.17,
    marginHorizontal: width * 0.05,
  },
  cardContainer: {
    width: width * 0.22,
    height: height * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
