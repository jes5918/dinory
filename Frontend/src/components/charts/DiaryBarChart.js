import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  Background,
  VictoryAxis,
} from 'victory-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function DiaryBarChart({data}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        매월 아이가 쓴 일기의 개수를 확인할 수 있습니다.
      </Text>
      <VictoryChart
        width={wp(80)}
        height={hp(60)}
        theme={VictoryTheme.material}
        domainPadding={wp(3)}
        style={{
          background: {fill: 'lightgray'},
        }}
        backgroundComponent={<Background />}>
        <VictoryBar
          style={{
            data: {fill: '#FB537B'},
            labels: {fill: 'black', fontSize: hp(3)},
          }}
          alignment="middle"
          data={data}
          x="date"
          y="value"
          animate={{
            duration: 2000,
            onLoad: {duration: 1000},
          }}
          labels={({datum}) => datum.value}
          labelComponent={<VictoryLabel />}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {},
});

export default DiaryBarChart;
