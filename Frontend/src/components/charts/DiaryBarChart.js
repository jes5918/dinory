import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BarChart, StackedBarChart} from 'react-native-chart-kit';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.9,
  useShadowColorFromDataset: false, // optional
};

function DiaryBarChart({data}) {
  return (
    <BarChart
      style={styles.graphStyle}
      data={data}
      width={wp(80)}
      height={hp(60)}
      fromZero={false} // 0부터 보여줄건지
      withInnerLines={true} // 안쪽에 dash 라인
      // yAxisLabel="$" // y축 라벨, prefix(앞)
      yAxisSuffix="회" // y축 라벨, suffix(뒤)
      showBarTops={false} // 막대 위에 바 보이기
      showValuesOnTopOfBars={true} // 막대 위에 값 보이기
      chartConfig={chartConfig} // 기본 설정
      verticalLabelRotation={0} // 수직
      horizontalLabelRotation={0} // 수평
    />
  );
}

const styles = StyleSheet.create({
  graphStyle: {
    borderRadius: 30,
    marginTop: hp(10),
  },
});

export default DiaryBarChart;
