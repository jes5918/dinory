import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/elements/Header';
import FlipCard from '../../components/elements/FlipCard';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function WordByAlphabet({data}) {
  const baseURL = 'http://j4b105.p.ssafy.io/words/';
  const url = require('../../assets/images/background1.png');

  return (
    <View style={styles.container}>
      <ImageBackground source={url} style={styles.bgImage}>
        <Header>
          <Text style={styles.headerTitle}>카드를 눌러보세요!</Text>
        </Header>
        <View style={styles.body}>
          <ScrollView horizontal>
            <TouchableOpacity activeOpacity={0.7} style={styles.cardContainer}>
              <FlipCard
                english={'english'}
                korean={'korean'}
                pos={'verb'}
                exampleSentence={'hello'}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontFamily: 'HoonPinkpungchaR',
    color: '#fff',
    fontSize: height * 0.04,
  },
  body: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContainer: {
    width: width * 0.22,
    height: height * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginHorizontal: width * 0.02,
  },
});
