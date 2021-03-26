import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';

// component
import Profile from '../../components/elements/Profile';
import ArrowButton from '../../components/elements/ArrowButton';

// data request
import getNotes from '../../api/diary/readDiary';

// image source
const url = require('../../assets/images/background1.png');
const egg = require('../../assets/images/egg.png');
const character = require('../../assets/images/character2.png');

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
      <Image style={styles.mainEgg} source={egg} />
      <CardComponent
        diaryText={diaryText}
        diaryImage={diaryImage}
        onHandlePress={onHandlePress}
      />
    </View>
  );
};

// FooterImage : footer 부분에 들어가는 날짜 텍스트 + 썸네일 컴포넌트입니다.
const FooterImage = ({image, year, month}) => {
  return (
    <View style={styles.thumbnailContainer}>
      <Text style={styles.thumbnailText}>
        {year}년 {month}월
      </Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Image style={styles.thumbnail} source={{uri: image}} />
      </TouchableOpacity>
    </View>
  );
};

// DiaryList : 전체를 렌더링하는 React Function Component입니다.
function DiaryList() {
  // states
  const [data, setData] = useState();

  // static variables
  const baseURL = 'http://j4b105.p.ssafy.io/media/';

  // utils
  const navigation = useNavigation();

  // methods
  const onHandleDetail = (diaryID) => {
    alert('onPress 이벤트!');
    // navigation으로 상세페이지로 이동(추후 구현)
  };

  // componentDidMount
  useEffect(() => {
    getNotes(
      10,
      (res) => {
        setData(() => res.data);
      },
      (err) => {
        console.error(err);
      },
    );
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={url} style={styles.backgroundImage} />
      <View style={styles.header}>
        <ArrowButton onHandlePress={() => navigation.goBack()} />
        <Profile />
      </View>
      <View style={styles.body}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.bodyCardContainer}>
          {data &&
            data.map((diary) => {
              return (
                <MainCardComponent
                  diaryText={diary.title}
                  // diaryImage={baseURL + diary.img}
                  diaryImage={
                    'http://j4b105.p.ssafy.io/media/images/2021/03/25/%EB%82%B4_%EC%82%AC%EC%A7%84_Jy4jjh2.jpg'
                  }
                  dateText={`${diary.year}.${diary.month}.${diary.date}`}
                  onHandlePress={onHandleDetail}
                  key={diary.id}
                />
              );
            })}
        </ScrollView>
        <Image style={styles.character} source={character} />
        <View style={styles.line} />
      </View>
      <View style={styles.footer}>
        <ScrollView style={styles.footerContainer} horizontal={true}>
          {data &&
            data.map((diary) => {
              return (
                <FooterImage
                  year={diary.year}
                  month={diary.month}
                  // image={baseURL + diary.img}
                  image={
                    'http://j4b105.p.ssafy.io/media/images/2021/03/25/%EB%82%B4_%EC%82%AC%EC%A7%84_Jy4jjh2.jpg'
                  }
                  key={diary.id}
                />
              );
            })}
        </ScrollView>
      </View>
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
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  header: {
    display: 'flex',
    flex: 1.5, // 141
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
  },
  body: {
    flex: 5,
    width: '100%',
    position: 'relative',
  },
  footer: {
    flex: 1.5,
    width: '100%',
    backgroundColor: 'rgba(255,255,255, 0.75)',
    elevation: 7,
  },
  footerContainer: {
    width: '100%',
    height: '100%',
    paddingTop: windowHeight * 0.0133,
  },
  text: {
    fontSize: 40,
  },
  thumbnailContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'auto',
    marginHorizontal: windowHeight * 0.0547,
  },
  thumbnail: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: 15,
  },
  thumbnailText: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    marginBottom: windowHeight * 0.01995,
  },
  bodyCardContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 100,
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
    width: windowWidth * 0.092,
    height: windowHeight * 0.05,
    backgroundColor: '#ED6D48',
    borderRadius: 17,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: windowHeight * 0.0133,
  },
  mainText: {
    fontSize: 18,
    fontFamily: 'NotoSansKR-Bold',
    color: 'white',
  },
  mainEgg: {
    width: windowWidth * 0.03,
    height: windowHeight * 0.0572,
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
    fontSize: 24,
    marginBottom: windowHeight * 0.0266,
  },
  cardImage: {
    borderRadius: 30,
    width: windowWidth * 0.169,
    height: windowWidth * 0.169,
  },
});

export default DiaryList;
