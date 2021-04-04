import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ContributionGraph} from 'react-native-chart-kit';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: 'gray',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

function HeatMapChart({data}) {
  const endDate = data[data.length - 1].date;
  return (
    <View style={styles.container}>
      <ContributionGraph
        style={styles.graphStyle}
        values={data}
        endDate={new Date(endDate)}
        numDays={100}
        width={wp(85)}
        height={hp(55)}
        chartConfig={chartConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphStyle: {
    backgroundColor: 'black',
  },
});

export default HeatMapChart;
