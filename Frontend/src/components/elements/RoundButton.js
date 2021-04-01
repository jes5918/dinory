import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// arrow는 true이면 round 형태의 화살표 버튼, false이면 round 형태의 텍스트 버튼
function RoundButton({text, arrow, onHandlePress, color, styleProps}) {
  return (
    <TouchableOpacity
      onPress={() =>
        onHandlePress ? onHandlePress() : alert('함수를 props로 내려주세요!')
      }
      activeOpacity={0.7}
      style={
        styleProps
          ? [
              styles.container,
              {
                borderWidth: arrow ? 0 : 6,
                padding: arrow ? 4 : 10,
                backgroundColor: color ? color : '#FB537B',
              },
              styleProps,
            ]
          : [
              styles.container,
              {
                borderWidth: arrow ? 0 : 6,
                padding: arrow ? 4 : 10,
                backgroundColor: color ? color : '#FB537B',
              },
            ]
      }>
      {arrow ? (
        <FontAwesome5Icon
          style={styles.arrowIcon}
          name={'arrow-right'}
          color="white"
        />
      ) : (
        <Text textBreakStrategy={'simple'} style={styles.text}>
          {text || '텍스트'}
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
    elevation: 7,
  },
  text: {
    color: 'white',
    fontFamily: 'HoonPinkpungchaR',
    fontSize: windowWidth * 0.01875,
    textAlign: 'center',
  },
  arrowIcon: {
    fontSize: windowWidth * 0.046875,
  },
});

export default RoundButton;
