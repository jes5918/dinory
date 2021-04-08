import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  Background,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
  Border,
} from 'victory-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const graphicColor = ['#ef476f', '#118ab2', '#06d6a0'];

function DiaryBarChart({data}) {
  const legendLabel = ['우리 아이', '또래 평균', '우리 아이들 평균'];
  const legendData = legendLabel.map((label, index) => {
    const newItem = {
      name: label,
      symbol: {fill: graphicColor[index]},
    };
    return newItem;
  });
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
          parent: {
            border: '1px solid #ccc',
          },
          // background: {fill: 'rgba(0,0,0,0.15)'},
          background: {fill: 'rgba(247,247,247,1)'},
        }}
        backgroundComponent={<Background />}>
        <VictoryLegend
          x={wp(26.5)}
          y={hp(2.5)}
          width={wp(15)}
          height={hp(10)}
          orientation="horizontal"
          centerTitle
          gutter={wp(5)}
          // rowGutter={hp(1)}
          data={legendData}
          // borderPadding={{top: hp(2), left: wp(1)}}
          borderComponent={<Border width={wp(20)} />}
          backgroundComponent={<Background />}
          labelComponent={
            <VictoryLabel
              style={{
                fontSize: hp(2.5),
                fontFamily: 'HoonPinkpungchaR',
              }}
            />
          }
        />
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: {
              fontSize: hp(2.3),
              fontWeight: 'bold',
              fontFamily: 'HoonPinkpungchaR',
            },
            ticks: {stroke: 'grey', size: hp(1.7)},
          }}
          tickValues={[5, 10, 15, 20, 25, 30, 35, 40]}
          theme={VictoryTheme.material}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              fontSize: hp(2.3),
              fontWeight: 'bold',
              fontFamily: 'HoonPinkpungchaR',
            },
            ticks: {stroke: 'grey', size: hp(1.7)},
          }}
          theme={VictoryTheme.material}
        />
        <VictoryGroup offset={wp(1.7)}>
          <VictoryBar
            style={{
              data: {fill: graphicColor[0]},
              labels: {
                fill: graphicColor[0],
                fontSize: hp(2.5),
                fontWeight: 'bold',
                fontFamily: 'HoonPinkpungchaR',
              },
            }}
            alignment="middle"
            data={data}
            x="date"
            y="value"
            animate={{
              duration: 2000,
              onLoad: {duration: 1000},
            }}
            labels={({datum}) => (datum.value ? parseInt(datum.value) : '')}
            labelComponent={<VictoryLabel />}
          />
          <VictoryBar
            style={{
              data: {fill: graphicColor[1]},
              labels: {
                fill: graphicColor[1],
                fontSize: hp(2.5),
                fontWeight: 'bold',
                fontFamily: 'HoonPinkpungchaR',
              },
            }}
            alignment="middle"
            data={data}
            x="date"
            y="valueAge"
            animate={{
              duration: 2000,
              onLoad: {duration: 1000},
            }}
            labels={({datum}) =>
              datum.valueAge ? parseInt(datum.valueAge) : ''
            }
            labelComponent={<VictoryLabel />}
          />
          <VictoryBar
            style={{
              data: {fill: graphicColor[2]},
              labels: {
                fill: graphicColor[2],
                fontSize: hp(2.5),
                fontWeight: 'bold',
                fontFamily: 'HoonPinkpungchaR',
              },
            }}
            alignment="middle"
            data={data}
            x="date"
            y="valueUser"
            animate={{
              duration: 2000,
              onLoad: {duration: 1000},
            }}
            labels={({datum}) =>
              datum.valueUser ? parseInt(datum.valueUser) : ''
            }
            labelComponent={<VictoryLabel />}
          />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  subContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: hp(3),
  },
});

export default DiaryBarChart;
