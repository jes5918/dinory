import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function HeatMapChart({data}) {
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(239, 71, 111,${opacity ? opacity : 1})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 2,
    useShadowColorFromDataset: false, // optional
    propsForLabels: {fontSize: hp(2.7), color: 'black'},
  };

  const endDate = new Date(data[data.length - 1].date);
  endDate.setDate(endDate.getDate() + 7);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        개발자들이 주로 사용하는 잔디 차트입니다. 아이가 일기를 쓰면 그 날에
        해당하는 사각형의 색이 더 진해집니다.
      </Text>
      <Text style={styles.subTitle}>
        매일 꾸준히 일기를 쓰면 그래프의 모든 사각형이 색칠됩니다.
      </Text>
      <ContributionGraph
        style={styles.graphStyle}
        values={data}
        endDate={endDate}
        numDays={200}
        width={wp(85)}
        height={hp(45)}
        chartConfig={chartConfig}
        gutterSize={hp(0.7)}
        squareSize={hp(3.8)}
      />
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>예전에 쓴 기록</Text>
        <Text style={styles.subTitle}>최근에 쓴 기록</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: wp(85),
    height: hp(70),
  },
  graphStyle: {},
  title: {
    fontSize: hp(3),
    marginBottom: hp(3),
    marginTop: hp(3.5),
    textAlign: 'center',
  },
  subTitle: {
    fontSize: hp(3),
    marginBottom: hp(3),
    color: 'rgba(0,0,0,0.9)',
  },
  subTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
});

export default HeatMapChart;
