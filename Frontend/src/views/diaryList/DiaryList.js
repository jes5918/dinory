import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import useDeepCompareEffect from 'use-deep-compare-effect';

// components
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import DiaryListFooter from '../../components/diary/DiaryListFooter';
import DiaryFooterImage from '../../components/diary/DiaryFooterImage';

// data request
import {getNotesByMonth, getNotesByYear} from '../../api/diary/readDiary';

// image source
const url = require('../../assets/images/background1.png');
const egg = require('../../assets/images/egg.png');
const character = require('../../assets/images/character2.png');

// static variables
const baseURL = 'https://j4b105.p.ssafy.io/';

// 일기 조회 컴포넌트 구조(페이지는 header, body, footer로 나눔)
// |- DiaryList : 렌더링할 컴포넌트
//    |- MainCardComponent : body에 들어가는 날짜, 달걀, 카드
//        |- CardComponent : MainCardComponent에 들어가는 카드
//    |- FooterImage : footer에 들어가는 날짜, 이미지

// CardComponent : 일기 제목 텍스트, 이미지가 있는 컴포넌트입니다.
const CardComponent = ({diaryText, diaryImage, onHandlePress}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        onHandlePress ? onHandlePress() : alert('함수를 props로 내려주세요!')
      }
      activeOpacity={0.7}
      style={styles.cardContainer}>
      <Text style={styles.cardText}>{diaryText}</Text>
      <Image style={styles.cardImage} source={{uri: diaryImage}} />
    </TouchableOpacity>
  );
};

// MainCardComponent : 날짜 부분, Egg 이미지, CardComponent를 포함하는 컴포넌트입니다.
const MainCardComponent = ({
  diaryText,
  diaryImage,
  dateText,
  onHandlePress,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainInner}>
        <Text style={styles.mainText}>{dateText}</Text>
      </View>
      <View style={styles.mainImage}>
        <Image style={styles.mainEgg} source={egg} />
      </View>
      <CardComponent
        diaryText={diaryText}
        diaryImage={diaryImage}
        onHandlePress={onHandlePress}
      />
    </View>
  );
};

// DiaryList : 전체를 렌더링하는 React Function Component입니다.
function DiaryList() {
  // childID를 props로 받지 않고 Redux에 있는 데이터를 조회한다.
  // states
  const [dataByMonth, setDataByMonth] = useState();
  const [dataByYear, setDataByYear] = useState();
  const [information, setInformation] = useState({
    child: 10,
    year: 2021,
    month: '02',
  });

  const navigation = useNavigation();

  const onHandleDetail = (params) => {
    const diariesByDay = dataByMonth.filter(
      (diary) => diary.month === params.month,
    );
    navigation.navigate('DiaryDetail', {
      ...params,
      diary: diariesByDay,
    });
  };

  const onHandleSelectMonth = ({year, month}) => {
    const newMonth = String(month).length === 1 ? '0' + String(month) : month;
    setInformation((prev) => {
      return {...prev, year, month: newMonth};
    });
  };

  const fetchNotesByMonth = ({child, year, month}) => {
    getNotesByMonth(
      {child, year, month},
      (res) => {
        setDataByMonth(() => res.data);
      },
      (err) => {
        console.error(err);
      },
    );
  };

  const fetchNotesByDay = ({child, year, month, date}) => {
    getNotesByYear(
      {child, year, month, date},
      (res) => {
        setDataByYear(() => res.data);
      },
      (err) => {
        console.error(err);
      },
    );
  };

  // componentDidMount
  useDeepCompareEffect(() => {
    fetchNotesByMonth(information);
  }, [information]);

  useEffect(() => {
    fetchNotesByDay({child: 10}); // Redux로 현재 로그인한 유저의 프로필 ID를 받아서 넘겨야한다.
  }, []);

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
                const {title, img, year, month, date, id} = diary;
                return (
                  <MainCardComponent
                    diaryText={title}
                    diaryImage={baseURL + img}
                    dateText={`${year}.${month}.${date}`}
                    onHandlePress={() => onHandleDetail({year, month, date})}
                    key={id}
                  />
                );
              })}
          </ScrollView>
          <Image style={styles.character} source={character} />
          <View style={styles.line} />
        </View>
        {/* {dataByYear && <DiaryListFooter></DiaryListFooter>} */}
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
  text: {
    fontSize: 40,
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
  },
  line: {
    width: windowWidth,
    height: windowHeight * 0.00532,
    backgroundColor: '#ED6D48',
    position: 'absolute',
    top: windowHeight * 0.1,
    // left: windowWidth * 0.06,
    zIndex: 0,
  },
  character: {
    width: windowWidth * 0.1367,
    height: windowHeight * 0.133,
    position: 'absolute',
    top: windowHeight * 0.02,
    left: windowWidth * 0.015,
    zIndex: 100,
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
    marginTop: 10,
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
});

export default DiaryList;
