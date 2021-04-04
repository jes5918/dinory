import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

function WordPieChart({data}) {
  console.log('WordPieChart Data : ', data);
  return (
    <PieChart
      style={styles.graphStyle}
      data={data.data}
      width={wp(40)}
      height={hp(40)}
      chartConfig={chartConfig}
      accessor={'population'}
      backgroundColor={'transparent'}
      paddingLeft={'15'}
      // center={[10, 50]}
      absolute
    />
  );
}

const styles = StyleSheet.create({
  graphStyle: {
    backgroundColor: 'lightgray',
    borderRadius: 30,
  },
});

export default WordPieChart;
