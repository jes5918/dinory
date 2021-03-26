import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

function DiaryFooterImage({onHandlePress, image, year, month}) {
  return (
    <View style={styles.thumbnailContainer}>
      <Text style={styles.thumbnailText}>
        {year}년 {month}월
      </Text>
      <TouchableOpacity onPress={() => onHandlePress} activeOpacity={0.7}>
        <Image style={styles.thumbnail} source={{uri: image}} />
      </TouchableOpacity>
    </View>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752

const styles = StyleSheet.create({
  thumbnailContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'auto',
    marginHorizontal: windowHeight * 0.0547,
    paddingLeft: windowWidth * 0.037,
  },
  thumbnail: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: 15,
  },
  thumbnailText: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 24,
    marginBottom: windowHeight * 0.01995,
  },
});

export default DiaryFooterImage;
