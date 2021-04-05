import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {VictoryPie, VictoryLegend, VictoryLabel, Point} from 'victory-native';

const graphicColor = [
  '#FF66B3',
  '#42BFDD',
  '#084B83',
  '#023e8a',
  '#6A5B6E',
  '#392F5A',
  '#9DD9D2',
  '#ffd7ba',
  '#F4D06F',
  '#FF8811',
].reverse();
const graphicColorOther = [
  '#9b5de5',
  '#f15bb5',
  '#fee440',
  '#00bbf9',
  '#00f5d4',
  '#f88dad',
  '#f9e9ec',
  '#fac748',
  '#8390fa',
  '#1d2f6f',
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
      <Text style={styles.title}>
        아이가 어떤 단어를 주로 사용하는지 알 수 있습니다.
      </Text>
      <View style={styles.subContainer}>
        <View style={styles.chart}>
          <VictoryPie
            animate={{easing: 'exp'}}
            data={graphicData}
            x="word"
            y="count"
            width={hp(60)}
            height={hp(60)}
            innerRadius={hp(5)}
            // colorScale={'qualitative'}
            colorScale={graphicColor}
            padAngle={1}
            // labels={({datum}) => datum.x}
            endAngle={270}
            labels={Array.from({length: 10}, (v, i) => `${data[i].count}회`)}
            labelComponent={
              <VictoryLabel
                style={{
                  fontSize: hp(3),
                  fontFamily: 'HoonPinkpungchaR',
                  color: 'red',
                }}
              />
            }
          />
        </View>
        <View style={styles.legend}>
          <VictoryLegend
            width={wp(30)}
            height={hp(50)}
            centerTitle
            orientation="vertical"
            gutter={wp(5)}
            rowGutter={hp(1.4)}
            style={{
              title: {fontSize: 20},
            }}
            data={legendData}
            borderPadding={{top: hp(2), left: wp(1)}}
            itemsPerRow={5}
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
        {/* <Image
        source={{uri: `data:image/png;base64,${imageSrc}`}}
        // source={{uri: imageSrc}}
        style={styles.wordCloudImage}
      /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chart: {
    paddingRight: wp(3),
  },
  legend: {
    height: hp(50),
  },
  wordCloudImage: {
    width: hp(35),
    height: hp(35),
    resizeMode: 'cover',
  },
  title: {
    fontSize: hp(3),
    marginTop: hp(3),
    marginBottom: hp(3),
  },
});

export default WordPieChart;
