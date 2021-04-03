import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//components
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import Header from '../../components/elements/Header';
import DiaryListFooter from '../../components/diary/DiaryListFooter';
import DiaryFooterImage from '../../components/diary/DiaryFooterImage';
import {getNotesByDay, getNotesByOneDay} from '../../api/diary/readDiary';

// static variable
const image = require('../../assets/images/background1.png');
const baseURL = 'https://j4b105.p.ssafy.io/api';

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

function DiaryDetail({route}) {
  let {year, month, date, diary, profilePK} = route.params;
  const [dataByDay, setDataByDay] = useState();
  const [dataJustOneDay, setDataJustOneDay] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const onHandleSelectDay = (clickedDate) => {
    setSelectedDate(clickedDate);
  };

  const fetchNotesByDay = (child, year, month, date) => {
    getNotesByDay(
      {
        child,
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

  const fetchNotesByOneDay = (child, year, month) => {
    getNotesByOneDay(
      {
        child,
        year,
        month: String(month).length === 1 ? '0' + String(month) : month,
      },
      (res) => {
        setDataJustOneDay(() => res.data);
      },
      (err) => {},
    );
  };

  useEffect(() => {
    let tempDate = selectedDate || date;
    fetchNotesByDay(profilePK, year, month, tempDate);
    fetchNotesByOneDay(profilePK, year, month);
  }, [profilePK, year, month, date, selectedDate]);

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={image}>
        <Header>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{`${year}년 ${month}월 ${
              selectedDate || date
            }일`}</Text>
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
          {dataJustOneDay &&
            dataJustOneDay.map((data) => {
              return (
                <DiaryFooterImage
                  key={data.id}
                  year={data.year}
                  month={month}
                  date={data.date}
                  image={baseURL + data.img}
                  onHandlePress={() => onHandleSelectDay(data.date)}
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
    resizeMode: 'contain',
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
    fontSize: windowWidth * 0.017, // 18
    lineHeight: windowHeight * 0.05,
    textDecorationLine: 'underline',
  },
});

export default DiaryDetail;
