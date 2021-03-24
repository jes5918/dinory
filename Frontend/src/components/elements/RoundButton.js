import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// arrow는 true이면 round 형태의 화살표 버튼, false이면 round 형태의 텍스트 버튼
function RoundButton({text, arrow}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {borderWidth: arrow ? 0 : 6, padding: arrow ? 4 : 10},
      ]}>
      {arrow ? (
        <FontAwesome5Icon
          style={styles.arrowIcon}
          name={'arrow-right'}
          color="white"
        />
      ) : (
        <Text textBreakStrategy={'simple'} style={styles.text}>
          {text || '개발자님 텍스트 인자를 넣어주세요.'}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width; // 1280

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#FB537B',
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 10},
    elevation: 10,
  },
  text: {
    color: 'white',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: 26,
    textAlign: 'center',
  },
  arrowIcon: {
    fontSize: 60,
  },
});

export default RoundButton;
