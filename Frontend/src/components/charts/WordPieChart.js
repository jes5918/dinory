import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {VictoryPie, VictoryLegend, VictoryLabel, Point} from 'victory-native';

const graphicColor = [
  '#ec407a',
  '#7e57c2',
  '#42a5f5',
  '#00bcd4',
  '#4caf50',
  '#ff5722',
  '#795548',
  '#616161',
  '#455a64',
  '#212121',
];
const defaultGraphicData = [
  {count: 1, word: ''},
  {count: 2, word: ''},
  {count: 3, word: ''},
  {count: 4, word: ''},
  {count: 5, word: ''},
  {count: 6, word: ''},
  {count: 7, word: ''},
  {count: 8, word: ''},
  {count: 9, word: ''},
  {count: 10, word: ''},
];

// legend, tooltip / label을 지우고, legend와 tooltip으로 구성
function WordPieChart({data, imageSrc}) {
  const [graphicData, setGraphicData] = useState(defaultGraphicData);
  useEffect(() => {
    setGraphicData(data);
  }, [data]);
  const legendData = data.map((item, index) => {
    const newItem = {
      name: item.word,
      symbol: {fill: graphicColor[index]},
    };
    return newItem;
  });
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>
        아이가 어떤 단어를 주로 사용하는지 알 수 있습니다.
      </Text> */}
      <View style={styles.chart}>
        <VictoryPie
          animate={{easing: 'exp'}}
          data={graphicData}
          x="word"
          y="count"
          width={hp(50)}
          height={hp(50)}
          innerRadius={30}
          // colorScale={'qualitative'}
          colorScale={graphicColor}
          padAngle={1}
          // labels={({datum}) => datum.x}
          // endAngle={180}
          labels={Array.from({length: 10}, (v, i) => `${data[i].count}회`)}
          labelComponent={
            <VictoryLabel
              style={{
                fontSize: hp(3),
                fontFamily: 'HoonPinkpungchaR',
              }}
            />
          }
        />
      </View>
      <View style={styles.legend}>
        <VictoryLegend
          width={wp(15)}
          height={hp(60)}
          centerTitle
          orientation="vertical"
          gutter={wp(5)}
          rowGutter={hp(1.4)}
          style={{
            title: {fontSize: 20},
          }}
          data={legendData}
          borderPadding={{top: hp(2), left: wp(1)}}
          labelComponent={
            <VictoryLabel
              style={{
                fontSize: hp(3),
                fontFamily: 'HoonPinkpungchaR',
              }}
            />
          }
        />
      </View>
      <Image
        source={{uri: `data:image/png;base64,${imageSrc}`}}
        // source={{uri: imageSrc}}
        style={styles.wordCloudImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  title: {},
  chart: {
    paddingTop: hp(4),
  },
  legend: {},
  wordCloudImage: {
    width: hp(35),
    height: hp(35),
    resizeMode: 'cover',
  },
});

export default WordPieChart;
