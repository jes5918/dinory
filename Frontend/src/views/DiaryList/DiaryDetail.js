import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import DiaryListFooter from '../../components/diary/DiaryListFooter';
import getNotesByDay from '../../api/diary/getNotesByDay';

const image = require('../../assets/images/background1.png');

const baseURL = 'http://j4b105.p.ssafy.io';

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
  const headerText = `${year}년 ${month}월 ${date}일`;
  const [dataByDay, setDataByDay] = useState();

  const onHandleSelectDay = () => {
    alert('footer에서 다른 월을 선택하다!!');
    // 다른 월의 일기를 렌더링함.
  };

  useEffect(() => {
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
  }, [year, month, date]);

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={image}>
        <Header>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{headerText}</Text>
          </View>
        </Header>
        <View style={styles.body}>
          {dataByDay &&
            dataByDay.map((data) => {
              return <Diary data={data} />;
            })}
        </View>
        {diary && (
          <DiaryListFooter data={diary} onHandlePress={onHandleSelectDay} />
        )}
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
    marginTop: windowHeight * 0.1,
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
