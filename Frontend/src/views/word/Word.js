import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import Header from '../../components/elements/Header';
import {useNavigation} from '@react-navigation/core';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const wordImage = [
  {src: require('../../assets/images/alphabet/A.png'), data: 'A'},
  {src: require('../../assets/images/alphabet/B.png'), data: 'B'},
  {src: require('../../assets/images/alphabet/C.png'), data: 'C'},
  {src: require('../../assets/images/alphabet/D.png'), data: 'D'},
  {src: require('../../assets/images/alphabet/E.png'), data: 'E'},
  {src: require('../../assets/images/alphabet/F.png'), data: 'F'},
  {src: require('../../assets/images/alphabet/G.png'), data: 'G'},
  {src: require('../../assets/images/alphabet/H.png'), data: 'H'},
  {src: require('../../assets/images/alphabet/I.png'), data: 'I'},
  {src: require('../../assets/images/alphabet/J.png'), data: 'J'},
  {src: require('../../assets/images/alphabet/K.png'), data: 'K'},
  {src: require('../../assets/images/alphabet/L.png'), data: 'L'},
  {src: require('../../assets/images/alphabet/M.png'), data: 'M'},
  {src: require('../../assets/images/alphabet/N.png'), data: 'N'},
  {src: require('../../assets/images/alphabet/O.png'), data: 'O'},
  {src: require('../../assets/images/alphabet/P.png'), data: 'P'},
  {src: require('../../assets/images/alphabet/Q.png'), data: 'Q'},
  {src: require('../../assets/images/alphabet/R.png'), data: 'R'},
  {src: require('../../assets/images/alphabet/S.png'), data: 'S'},
  {src: require('../../assets/images/alphabet/T.png'), data: 'T'},
  {src: require('../../assets/images/alphabet/U.png'), data: 'U'},
  {src: require('../../assets/images/alphabet/V.png'), data: 'V'},
  {src: require('../../assets/images/alphabet/W.png'), data: 'W'},
  {src: require('../../assets/images/alphabet/X.png'), data: 'X'},
  {src: require('../../assets/images/alphabet/Y.png'), data: 'Y'},
  {src: require('../../assets/images/alphabet/Z.png'), data: 'Z'},
];

export default function Word() {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.wordContainer}
        onPress={() =>
          navigation.navigate('WordByAlphabet', {data: item.data})
        }>
        <Image source={item.src} style={styles.alphabet} />
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();
  const url = require('../../assets/images/background1.png');

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={url}>
        <Header>
          <Text style={styles.headerTitle}>
            찾으려는 단어의 알파벳을 선택하세요!
          </Text>
        </Header>
        <View style={styles.body}>
          <ScrollView horizontal>
            <FlatList
              data={wordImage}
              keyExtractor={(item) => item.src.toString()}
              renderItem={renderItem}
              numColumns={13}
            />
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
  body: {
    flex: 6,
    flexDirection: 'row',
    marginTop: height * 0.17,
    alignItems: 'center',
  },
  wordContainer: {
    display: 'flex',
    backgroundColor: '#fff',
    width: width * 0.15,
    height: height * 0.3,
    borderRadius: 30,
    marginVertical: height * 0.02,
    marginHorizontal: width * 0.02,
    padding: height * 0.04,
    elevation: 7,
  },
  alphabet: {
    flex: 1,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  headerTitle: {
    fontFamily: 'HoonPinkpungchaR',
    color: '#fff',
    fontSize: height * 0.04,
  },
});
