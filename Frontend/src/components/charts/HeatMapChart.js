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
    color: (opacity = 1) => `rgba(239, 71, 111,${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 2,
    useShadowColorFromDataset: false, // optional
    propsForLabels: {fontSize: hp(2.7), color: 'black'},
  };
  const endDate = data[data.length - 1].date;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        꾸준히 일기를 썼는지 알 수 있습니다. 색의 진함과 일기 수가 비례합니다.
      </Text>
      <ContributionGraph
        style={styles.graphStyle}
        values={data}
        endDate={new Date(endDate)}
        numDays={200}
        width={wp(85)}
        height={hp(45)}
        chartConfig={chartConfig}
        gutterSize={hp(0.7)}
        squareSize={hp(3.8)}
      />
      <Text style={styles.subTitle}>
        왼쪽부터 오른쪽으로 갈수록 최근 데이터입니다.
      </Text>
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
    marginBottom: hp(6),
    marginTop: hp(3.5),
  },
  subTitle: {
    fontSize: hp(2.6),
    marginBottom: hp(3),
    color: 'rgba(0,0,0,0.9)',
  },
});

export default HeatMapChart;
