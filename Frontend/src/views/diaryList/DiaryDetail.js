import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import DiaryListFooter from '../../components/diary/DiaryListFooter';
import DiaryFooterImage from '../../components/diary/DiaryFooterImage';
import getNotesByDay from '../../api/diary/getNotesByDay';
import useDeepCompareEffect from 'use-deep-compare-effect';

const image = require('../../assets/images/background1.png');

const baseURL = 'https://j4b105.p.ssafy.io';

const Diary = ({data}) => {
  return (
    <View style={styles.bodyContainer}>
      <Image style={styles.image} source={{uri: data && baseURL + data.img}} />
      <View style={styles.mainBox}>
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

function DiaryDetail({route, navigation}) {
  const {year, month, date, diary} = route.params;
  const [dataByDay, setDataByDay] = useState();
  const [information, setInformation] = useState({year, month, date});

  const onHandleSelectDay = ({year, month, date}) => {
    const newMonth = String(month).length === 1 ? '0' + String(month) : month;
    setInformation((prev) => {
      return {...prev, year, month: newMonth, date};
    });
  };

  const fetchNotesByDay = ({child, year, month, date}) => {
    getNotesByDay(
      {
        child: '10',
        year,
        month: String(month).length === 1 ? '0' + String(month) : month,
        date,
      },
      (res) => {
        setDataByDay(() => res.data); // 일단 하나 받는 걸로 고정.
      },
      (err) => {
        console.error(err);
      },
    );
  };

  useDeepCompareEffect(() => {
    fetchNotesByDay(information);
  }, [information]);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={image}>
        <Header>
          <View style={styles.headerContainer}>
            <Text
              style={
                styles.headerText
              }>{`${information.year}년 ${information.month}월 ${information.date}일`}</Text>
          </View>
        </Header>
        <View style={styles.body}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={[
              {
                paddingLeft: windowWidth * 0.14,
                paddingRight: windowWidth * 0.1,
              },
            ]}
            style={styles.bodyCardContainer}>
            {dataByDay &&
              dataByDay.map((data) => {
                return <Diary data={data} key={data.id} />;
              })}
          </ScrollView>
        </View>
        <DiaryListFooter>
          {diary &&
            diary.map((data) => {
              return (
                <DiaryFooterImage
                  key={data.id}
                  year={data.year}
                  month={data.month}
                  date={data.date}
                  image={baseURL + data.img}
                  onHandlePress={() =>
                    onHandleSelectDay({
                      year: data.year,
                      month: data.month,
                      date: data.date,
                    })
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
    flex: 5,
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.17,
  },
  bodyContainer: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.55,
    backgroundColor: 'white',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    marginRight: windowWidth * 0.14,
  },
  bodyCardContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 100,
  },
  image: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: 30,
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
    fontSize: windowWidth * 0.024, // 24
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
    // fontSize: windowWidth * 0.014, // 18
    fontSize: windowWidth * 0.017, // 18
    lineHeight: windowHeight * 0.05,
    textDecorationLine: 'underline',
  },
});

export default DiaryDetail;
