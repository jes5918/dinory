import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';

// components
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import DiaryListFooter from '../../components/diary/DiaryListFooter';
import DiaryFooterImage from '../../components/diary/DiaryFooterImage';
// data request
import {getNotesByMonth, getNotesByYear} from '../../api/diary/readDiary';

// static variables
const url = require('../../assets/images/background1.png');
const egg = require('../../assets/images/egg.png');
const character = require('../../assets/images/character2.png');
const baseURL = 'https://j4b105.p.ssafy.io/api';
const stamp = require('../../assets/images/stamp.png');
const CardComponent = ({diaryText, diaryImage, onHandlePress, check}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() =>
          onHandlePress ? onHandlePress() : alert('함수를 props로 내려주세요!')
        }
        activeOpacity={0.7}
        style={styles.cardContainer}>
        {check ? <Image source={stamp} style={styles.stamp} /> : null}
        <Text style={styles.cardText}>{diaryText}</Text>
        <FastImage style={styles.cardImage} source={{uri: diaryImage}} />
      </TouchableOpacity>
    </>
  );
};

const MainCardComponent = ({
  diaryText,
  diaryImage,
  dateText,
  onHandlePress,
  check,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainInner}>
        <Text style={styles.mainText}>{dateText}</Text>
      </View>
      <View style={styles.mainImage}>
        <FastImage style={styles.mainEgg} source={egg} />
      </View>
      <CardComponent
        diaryText={diaryText}
        diaryImage={diaryImage}
        onHandlePress={onHandlePress}
        check={check}
      />
    </View>
  );
};

function DiaryList({route}) {
  const [dataByMonth, setDataByMonth] = useState();
  const [dataByYear, setDataByYear] = useState();
  const [fetchYear, setFetchYear] = useState();
  const [fetchMonth, setFetchMonth] = useState();
  const {profilePK} = route.params;

  const navigation = useNavigation();

  const onHandleDetail = (params) => {
    navigation.navigate('DiaryDetail', {
      ...params,
      profilePK: profilePK,
    });
  };

  const onHandleSelectMonth = ({year, month}) => {
    const newMonth = String(month).length === 1 ? '0' + String(month) : month;
    setFetchYear(year);
    setFetchMonth(newMonth);
  };

  const fetchNotesByMonth = useCallback((child, year, month) => {
    getNotesByMonth(
      {child, year, month},
      (res) => {
        setDataByMonth(() => res.data);
      },
      () => {},
    );
  }, []);

  const fetchNotesByYear = useCallback((child) => {
    getNotesByYear(
      child,
      (res) => {
        setDataByYear(() => res.data);
      },
      () => {},
    );
  }, []);

  useEffect(() => {
    fetchNotesByMonth(profilePK, fetchYear, fetchMonth);
    fetchNotesByYear(profilePK);
  }, [profilePK, fetchYear, fetchMonth, fetchNotesByMonth, fetchNotesByYear]);

  return (
    <View style={styles.container}>
      <BackgroundAbsolute style={styles.container} imageSrc={url}>
        <Header />
        <View style={styles.body}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={[
              {
                paddingLeft: windowWidth * 0.08,
                paddingRight: windowWidth * 0.1,
              },
            ]}
            style={styles.bodyCardContainer}>
            {dataByMonth &&
              dataByMonth.map((diary) => {
                const {title, img, year, month, date, id, check} = diary; // 현재 체크가 없음
                return (
                  <MainCardComponent
                    diaryText={title}
                    diaryImage={baseURL + img}
                    dateText={`${year}.${month}.${date}`}
                    onHandlePress={() =>
                      onHandleDetail({year, month, date, diaryPK: id, check})
                    }
                    key={id}
                    check={check}
                  />
                );
              })}
          </ScrollView>
          <FastImage style={styles.character} source={character} />
          <View style={styles.line} />
        </View>
        <DiaryListFooter>
          {dataByYear &&
            dataByYear.map((data) => {
              return (
                <DiaryFooterImage
                  key={data.id}
                  year={data.year}
                  month={data.month}
                  date={data.date}
                  image={baseURL + data.img}
                  onHandlePress={() =>
                    onHandleSelectMonth({year: data.year, month: data.month})
                  }
                />
              );
            })}
        </DiaryListFooter>
      </BackgroundAbsolute>
    </View>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 5,
    width: '100%',
    position: 'relative',
    marginTop: windowHeight * 0.1,
  },
  bodyCardContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 100,
    paddingLeft: windowWidth * 0.12,
  },
  mainContainer: {
    width: windowWidth * 0.161,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: windowWidth * 0.0781,
  },
  mainInner: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
    backgroundColor: '#ED6D48',
    borderRadius: 17,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: windowHeight * 0.0133,
  },
  mainText: {
    fontSize: windowWidth * 0.014, // 18
    fontFamily: 'NotoSansKR-Bold',
    color: 'white',
  },
  mainImage: {
    width: windowWidth * 0.034,
    height: windowHeight * 0.061,
  },
  mainEgg: {
    width: windowWidth * 0.031,
    height: windowHeight * 0.061,
    resizeMode: 'contain',
  },
  line: {
    width: windowWidth,
    height: windowHeight * 0.00532,
    backgroundColor: '#ED6D48',
    position: 'absolute',
    top: windowHeight * 0.1,
    zIndex: 0,
  },
  character: {
    width: windowWidth * 0.1367,
    height: windowHeight * 0.133,
    position: 'absolute',
    top: windowHeight * 0.02,
    left: windowWidth * 0.015,
    zIndex: 100,
    resizeMode: 'contain',
  },

  cardContainer: {
    width: windowWidth * 0.2,
    height: 'auto',
    borderRadius: 30,
    elevation: 7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: windowWidth * 0.0235,
    paddingVertical: windowHeight * 0.0266,
    marginTop: hp(1.5),
  },
  cardText: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: windowWidth * 0.01875, // 24
    marginBottom: windowHeight * 0.0266,
  },
  cardImage: {
    borderRadius: 30,
    width: windowWidth * 0.169,
    height: windowWidth * 0.169,
  },
  arrowIcon: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.5,
  },
  stamp: {
    position: 'absolute',
    width: windowHeight * 0.1,
    height: windowHeight * 0.1,
    right: windowWidth * -0.007,
    top: windowHeight * -0.01,
  },
});

export default React.memo(DiaryList);
