import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, ScrollView, Text} from 'react-native';
import Header from '../../components/elements/Header';
import FlipCard from '../../components/elements/FlipCard';
import {getListbyAlphabet} from '../../api/word/readWord';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function WordByAlphabet({route}) {
  const url = require('../../assets/images/background1.png');
  const [listByAlpha, setListByAlpha] = useState();
  const alphabet = route.params.selectAlpha;

  const child = '10'; // 임시
  useEffect(() => {
    getListbyAlphabet(
      {child: child, alphabet: alphabet},
      (res) => {
        setListByAlpha(() => res.data);
      },
      (err) => {
        console.log(err);
      },
    );
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
    fontSize: height * 0.04,
  },
  body: {
    flex: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.17,
  },
  cardContainer: {
    width: width * 0.22,
    height: height * 0.42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
