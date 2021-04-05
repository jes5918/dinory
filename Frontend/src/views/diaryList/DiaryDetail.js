import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//components
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import {getNotesOnlyDay} from '../../api/diary/readDiary';

// static variable
const image = require('../../assets/images/background1.png');
const baseURL = 'https://j4b105.p.ssafy.io/api';

const Diary = ({data}) => {
  return (
    <View style={styles.bodyContainer}>
      <Image style={styles.image} source={{uri: data && baseURL + data.img}} />
      <View style={styles.mainBox}>
        <Image
          style={styles.imageBack}
          source={require('../../assets/images/logo_ver2.png')}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.mainText}>제목 : {data && data.title}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{data && data.content}</Text>
        </View>
      </View>
    </View>
  );
};

function DiaryDetail({route}) {
  let {year, month, date, diaryPK} = route.params;
  const [dataByDay, setDataByDay] = useState();
  const headerTitle = `${year}년 ${month}월 ${date}일`;

  const fetchNotesOnlyDay = (selectedDiaryPK) => {
    getNotesOnlyDay(
      selectedDiaryPK,
      (res) => {
        setDataByDay(() => res.data);
      },
      (err) => {},
    );
  };

  useEffect(() => {
    fetchNotesOnlyDay(diaryPK);
  }, [diaryPK]);

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={image}>
        <Header>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{headerTitle}</Text>
          </View>
        </Header>
        <View style={styles.body}>
          {dataByDay && <Diary data={dataByDay} />}
        </View>
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
  headerContainer: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.07,
    marginTop: windowHeight * 0.02,
    borderRadius: 50,
    elevation: 7,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: windowWidth * 0.01875,
    fontFamily: 'HoonPinkpungchaR',
  },
  body: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.75,
    backgroundColor: '#fffff0',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.05,
    marginTop: windowHeight * 0.08,
  },
  image: {
    width: windowHeight * 0.7,
    height: windowHeight * 0.7,
    maxHeight: windowHeight * 0.7,
    maxWidth: windowHeight * 0.7,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    width: windowWidth * 0.3,
  },
  mainContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: hp(4), // 24
  },
  contentContainer: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
  },
  contentText: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: hp(3), // 18
    lineHeight: hp(5),
  },
  imageBack: {
    position: 'absolute',
    width: windowWidth * 0.26,
    height: null,
    aspectRatio: 400 / 150,
    top: windowHeight * 0.3,
    opacity: 0.1,
  },
});

export default DiaryDetail;
