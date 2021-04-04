import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// fetch
import {
  getWordFrequency,
  getWordCloudImage,
  getDiaryStats,
  getCommitCount,
} from '../../api/statistics/readStatistics';

// components
import AuthBackGround from '../../components/authorization/AuthBackGround';
import Header from '../../components/elements/Header';
import DiaryBarChart from '../../components/charts/DiaryBarChart';
import WordPieChart from '../../components/charts/WordPieChart';
import HeatMapChart from '../../components/charts/HeatMapChart';

const transformMonth = (mon) => {
  const nowMon = mon + 1;
  const res = String(nowMon).length === 1 ? '0' + String(nowMon) : nowMon;
  return res;
};

// static variables
const date = new Date();
const year = date.getFullYear();
const getMonth = date.getMonth();
const month = transformMonth(getMonth);
const randomColors = [
  '#8e24aa',
  '#ea80fc',
  '#8c9eff',
  '#80d8ff',
  '#a7ffeb',
  '#ccff90',
  '#ffff8d',
  '#5c6bc0',
  '#ff9e80',
  '#90a4ae',
];

const generateMonthLabel = (startMonth) => {
  const monthLabels = Array.from({length: 12}, (value, index) =>
    transformMonth(index),
  );

  const leftLabels = monthLabels
    .slice(startMonth)
    .map((label) => `${year - 1}.${label}`);

  const rightLabels = monthLabels
    .slice(0, startMonth)
    .map((label) => `${year}.${label}`);

  const returnLabels = leftLabels.concat(rightLabels);

  return returnLabels;
};

function DiaryChart({route}) {
  const profilePK = route.params.profilePK;
  const [wordFreq, setWordFreq] = useState();
  const [wordCloudImage, setWordCloudImage] = useState();
  const [diaryStats, setDiaryStats] = useState();
  const [commitCount, setCommitCount] = useState();
  const [selectedChart, setSelectedChart] = useState(0);

  const generateDiaryStatsData = (diaryData) => {
    const resData = {
      labels: generateMonthLabel(getMonth),
      datasets: [
        {
          data: diaryData.age_child_cnt,
        },
      ],
    };
    return resData;
  };

  // 바 차트 데이터 예시
  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June"],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43]
  //     }
  //   ]
  // };

  const generateWordFreqData = (wordData) => {
    const average = wordData.average; // 단어당 평균 사용 횟수
    const total = wordData.total; // 총 단어 사용 횟수
    const words = wordData.words; // 가장 많이 사용하는 단어 Top 10, {content, count, rate}

    const resData = words.map((word, index) => {
      const mappingWord = {
        name: word.content,
        population: word.count,
        color: randomColors[index],
        legendFontColor: '#7F7F7F',
        legendFontSize: hp(2.5),
      };

      return mappingWord;
    });

    return {avg: average, total: total, data: resData};
  };

  // 파이 차트 데이터 예시
  // const data = [
  //   {
  //     name: "Seoul",
  //     population: 21500000,
  //     color: "rgba(131, 167, 234, 1)",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15
  //   },]

  const fetchWordFrequency = useCallback(() => {
    getWordFrequency(
      profilePK,
      (res) => {
        setWordFreq(res.data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [profilePK]);

  const fetchWordCloudImage = useCallback(() => {
    getWordCloudImage(
      profilePK,
      (res) => {
        setWordCloudImage(res.data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [profilePK]);

  const fetchDiaryStats = useCallback(() => {
    getDiaryStats(
      {child: profilePK, year, month},
      (res) => {
        setDiaryStats(res.data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [profilePK]);

  const fetchCommitCount = useCallback(() => {
    getCommitCount(
      {child: profilePK, year},
      (res) => {
        setCommitCount(res.data);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [profilePK]);

  useEffect(() => {
    fetchWordFrequency();
    fetchWordCloudImage();
    fetchDiaryStats();
    fetchCommitCount();
  }, [
    fetchWordFrequency,
    fetchWordCloudImage,
    fetchDiaryStats,
    fetchCommitCount,
  ]);

  return (
    <AuthBackGround>
      <Header logoHeader={true} />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => setSelectedChart(0)}
          style={[
            styles.changeButton,
            {
              backgroundColor: selectedChart === 0 ? '#2196f3' : 'lightgray',
              color: selectedChart === 0 ? 'white' : 'black',
            },
          ]}>
          <Text style={styles.headerText}>매월 일기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedChart(1)}
          style={[
            styles.changeButton,
            {
              backgroundColor: selectedChart === 1 ? '#2196f3' : 'lightgray',
              color: selectedChart === 1 ? 'white' : 'black',
            },
          ]}>
          <Text style={styles.headerText}>단어 사용</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedChart(2)}
          style={[
            styles.changeButton,
            {
              backgroundColor: selectedChart === 2 ? '#2196f3' : 'lightgray',
              color: selectedChart === 2 ? 'white' : 'black',
            },
          ]}>
          <Text style={styles.headerText}>매일 기록</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {selectedChart === 0 && diaryStats && (
          <DiaryBarChart data={generateDiaryStatsData(diaryStats)} />
        )}
        {selectedChart === 1 && wordFreq && (
          <WordPieChart data={generateWordFreqData(wordFreq)} />
        )}
        {selectedChart === 2 && commitCount && (
          <HeatMapChart data={commitCount} />
        )}
      </View>
    </AuthBackGround>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: wp(90),
    minHeight: hp(70),
    backgroundColor: 'white',
    marginTop: hp(7),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 7,
    paddingHorizontal: wp(5),
  },
  headerContainer: {
    width: wp(50),
    minHeight: hp(10),
    marginTop: wp(2),
    borderRadius: 20,
    elevation: 7,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  changeButton: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(2),
    borderRadius: 15,
  },
  headerText: {
    fontSize: wp(2),
    fontFamily: 'HoonPinkpungchaR',
  },
});

export default DiaryChart;
