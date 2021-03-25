import React, {useEffect} from 'react';
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

// component
import Profile from '../../components/elements/Profile';
import ArrowButton from '../../components/elements/ArrowButton';

// data request
import getNotes from '../../api/readDiary';

// image source
const url = require('../../assets/images/background1.png');
const egg = require('../../assets/images/egg.png');
const character = require('../../assets/images/character2.png');

// CardComponent : 일기 제목 텍스트, 이미지가 있는 컴포넌트입니다.
const CardComponent = ({diaryText, diaryImage, onHandlePress}) => {
  const tmpText = 'This is sour cream. There is no ...';
  const tmpimage = url;
  return (
    <TouchableOpacity
      onPress={() =>
        onHandlePress ? onHandlePress() : alert('함수를 props로 내려주세요!')
      }
      activeOpacity={0.7}
      style={styles.cardContainer}>
      <Text style={styles.cardText}>{diaryText || tmpText}</Text>
      <Image style={styles.cardImage} source={diaryImage || tmpimage} />
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
  const tmpDateText = '2021.03.20';
  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainInner}>
        <Text style={styles.mainText}>{dateText || tmpDateText}</Text>
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
const FooterImage = ({image, month}) => {
  return (
    <View style={styles.thumbnailContainer}>
      <Text style={styles.thumbnailText}>2021년 {month}월</Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Image style={styles.thumbnail} source={image} />
      </TouchableOpacity>
    </View>
  );
};

// DiaryList : 전체를 렌더링하는 React Function Component입니다.
function DiaryList() {
  useEffect(() => {
    let tempData = getNotes(10);
    console.log(tempData);
  }, []);
  const tempData = [1, 2, 3, 4, 5, 6, 7, 8, 9].reverse();
  const tmpDiaryText = 'This is sour cream. There is no ...';
  const tmpDiaryImage = url;
  const tmpDateText = '2021.03.21';

  const tmpOnPress = () => {
    alert('onPress 이벤트!');
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={url} style={styles.backgroundImage} />
      <View style={styles.header}>
        <ArrowButton />
        <Profile />
      </View>
      <View style={styles.body}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.bodyCardContainer}>
          {tempData.map((item) => {
            return (
              <MainCardComponent
                diaryText={tmpDiaryText}
                diaryImage={tmpDiaryImage}
                dateText={tmpDateText}
                onHandlePress={tmpOnPress}
                key={item}
              />
            );
          })}
        </ScrollView>
        <Image style={styles.character} source={character} />
        <View style={styles.line} />
      </View>
      <View style={styles.footer}>
        <ScrollView style={styles.footerContainer} horizontal={true}>
          {tempData.map((item) => {
            return <FooterImage month={item} image={url} key={item} />;
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
    paddingTop: 10,
  },
  text: {
    fontSize: 40,
  },
  thumbnailContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'auto',
    marginHorizontal: 70,
  },
  thumbnail: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: 15,
  },
  thumbnailText: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    marginBottom: 15,
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
    // position: 'absolute',
    width: windowWidth * 0.161,
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 100,
  },
  mainInner: {
    width: windowWidth * 0.092,
    height: windowHeight * 0.05,
    backgroundColor: '#ED6D48',
    borderRadius: 17,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  mainText: {
    fontSize: 18,
    // fontFamily: 'HoonPinkpungchaR',
    fontFamily: 'NotoSansKR-Bold',
    color: 'white',
  },
  mainEgg: {
    width: 38,
    height: 43,
  },
  line: {
    width: windowWidth,
    height: 4,
    backgroundColor: '#ED6D48',
    position: 'absolute',
    top: windowHeight * 0.1,
    left: windowWidth * 0.06,
    zIndex: 0,
  },
  character: {
    width: 175,
    height: 100,
    position: 'absolute',
    top: windowHeight * 0.02,
    left: windowWidth * 0.015,
    zIndex: 100,
  },

  cardContainer: {
    // width: windowWidth * 0.161,
    width: windowWidth * 0.2,
    height: 'auto',
    borderRadius: 30,
    elevation: 7,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginTop: 10,
  },
  cardText: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    marginBottom: 20,
  },
  cardImage: {
    borderRadius: 30,
    width: windowWidth * 0.169,
    height: windowWidth * 0.169,
  },
});

export default DiaryList;
