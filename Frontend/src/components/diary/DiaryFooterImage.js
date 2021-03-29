import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

function DiaryFooterImage({onHandlePress, image, year, month, date}) {
  const letters = date ? `${month}월 ${date}일` : `${year}년 ${month}월`;
  return (
    <View style={styles.thumbnailContainer}>
      <Text style={styles.thumbnailText}>{letters}</Text>
      <TouchableOpacity
        onPress={() => onHandlePress({year, month})}
        activeOpacity={0.7}>
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
    paddingLeft: windowWidth * 0.055,
  },
  thumbnail: {
    width: windowWidth * 0.075,
    height: windowWidth * 0.075,
    borderRadius: 15,
  },
  thumbnailText: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: windowWidth * 0.014, // 18
    marginBottom: windowHeight * 0.01,
  },
});

export default DiaryFooterImage;
