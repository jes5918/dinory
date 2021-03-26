import React from 'react';
import {View, ScrollView, Dimensions, StyleSheet} from 'react-native';

// component
import DiaryFooterImage from './DiaryFooterImage';

const baseURL = 'http://j4b105.p.ssafy.io/media/';

function DiaryListFooter({data, onHandlePress}) {
  return (
    <View style={styles.footer}>
      <ScrollView style={styles.footerContainer} horizontal={true}>
        {data &&
          data.map((diary) => {
            return (
              <DiaryFooterImage
                key={diary.id}
                year={String(diary.vol).slice(0, 4)}
                month={String(diary.vol).slice(4, 6)}
                image={baseURL + diary.img}
                onHandlePress={onHandlePress}
              />
            );
          })}
      </ScrollView>
    </View>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752

const styles = StyleSheet.create({
  footer: {
    flex: 1.5,
    width: '100%',
    backgroundColor: 'rgba(255,255,255, 0.75)',
    elevation: 7,
  },
  footerContainer: {
    width: '100%',
    height: '100%',
    paddingTop: windowHeight * 0.0133,
  },
});

export default DiaryListFooter;
