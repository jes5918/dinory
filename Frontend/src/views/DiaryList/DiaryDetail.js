import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Layout from '../../components/elements/Layout';
import Header from '../../components/elements/Header';
import DiaryListFooter from '../../components/diary/DiaryListFooter';
import getNotesByDay from '../../api/diary/getNotesByDay';

const image = require('../../assets/images/background1.png');

const baseURL = 'http://j4b105.p.ssafy.io';

function DiaryDetail({route, navigation}) {
  const {year, month, date, diary} = route.params;
  const headerText = `${year}년 ${month}월 ${date}일`;
  const [dataByDay, setDataByDay] = useState();

  const onHandleSelectDay = () => {
    alert('footer에서 다른 월을 선택하다!!');
    // 다른 월의 일기를 렌더링함.
  };

  const sendMonth = String(month).lenght === 1 ? `0${month}` : month;

  useEffect(() => {
    getNotesByDay(
      // {child: '10', year, month: sendMonth, date},
      {child: '10', year: '2021', month: '02', date: '21'},
      (res) => {
        setDataByDay(() => res.data[0]);
      },
      (err) => {
        console.error(err);
      },
    );
  }, [year, sendMonth, date]);

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={image} />
      <Header>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{headerText}</Text>
          {/* <Text style={styles.headerText}>2021년 12월 30일</Text> */}
        </View>
      </Header>
      <View style={styles.body}>
        <View style={styles.bodyContainer}>
          <Image
            style={styles.image}
            source={{uri: dataByDay && baseURL + dataByDay.img}}
          />
          <View style={styles.mainBox}>
            <View style={styles.mainContainer}>
              <Text style={styles.mainText}>
                제목 : {dataByDay && dataByDay.title}
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.contentText}>
                NHS England national medical director Prof Stephen Powis said
                "enormous progress" had been made, but it "does not mean job
                done".
              </Text>
            </View>
          </View>
        </View>
      </View>
      {diary && (
        <DiaryListFooter data={diary} onHandlePress={onHandleSelectDay} />
      )}
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
    height: windowHeight * 0.1,
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
  },
  bodyContainer: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.55,
    backgroundColor: 'white',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 24,
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
    fontSize: windowWidth * 0.01875, // 24
  },
  contentContainer: {
    flex: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contentText: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: windowWidth * 0.014, // 18
    lineHeight: windowHeight * 0.05,
    textDecorationLine: 'underline',
  },
});

export default DiaryDetail;
