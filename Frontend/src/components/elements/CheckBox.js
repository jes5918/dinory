import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {Text, View, StyleSheet, Animated, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const calculateLength = (text) => {
  return text.length > 9 ? (text.length - 9) * 18 : 0;
};
const calculateFontSize = (text) => {
  return text.length > 9 ? 18 - (text.length - 9) : 0;
};

const windowWidth = Dimensions.get('window').width;

export default function CheckBox({textEn, textKr}) {
  // text = 18px, lenght 1당 18px 추가.
  // const textEnWidth = windowWidth * 0.15 + calculateLength(textEn);
  // const textKrWidth = windowWidth * 0.15 + calculateLength(textKr);
  const textEnWidth = windowWidth * 0.15;
  const textKrWidth = windowWidth * 0.15;

  const [check, setCheck] = useState(false);

  // 카드 애니메이션
  const animatedValue = useMemo(() => new Animated.Value(0), []);
  let value = 0;
  animatedValue.addListener((e) => {
    value = e.value;
  });

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: frontInterpolate,
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: backInterpolate,
      },
    ],
  };

  // Method 정의

  const onHandleFlipCard = useCallback(() => {
    if (value >= 90) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [value, animatedValue]);

  const onHandleCheck = () => {
    setCheck((prevCheck) => !prevCheck);
  };

  const onHandleVolume = () => {
    console.log('Volume Part');
  };

  useEffect(() => {
    onHandleFlipCard();
  }, [onHandleFlipCard]);

  return (
    <View style={[styles.box, {width: textEnWidth}]}>
      {/* front */}
      {/* 코드 순서상 아래에 있는 back이 먼저 보임. 따라서 textKr을 front에서 출력합니다.  */}
      <Animated.View
        style={[
          styles.container,
          styles.front,
          frontAnimatedStyle,
          {backgroundColor: check ? '#19DC4D' : 'white', width: textEnWidth},
        ]}>
        <TouchableOpacity
          onPress={() => onHandleCheck()}
          style={styles.checkRound}>
          {check && <FontAwesome5 style={styles.check} name={'check'} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchText}
          onPress={() => onHandleFlipCard()}
          name={'check'}>
          <Text style={styles.text}>{textKr}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.volume}
          onPress={() => onHandleVolume()}>
          <FontAwesome5
            style={styles.volumeIcon}
            name={'volume-up'}
            color="#9D9D9D"
          />
        </TouchableOpacity>
      </Animated.View>

      {/* back */}
      <Animated.View
        style={[
          styles.container,
          styles.back,
          backAnimatedStyle,
          {backgroundColor: check ? '#19DC4D' : 'white', width: textEnWidth},
        ]}>
        <TouchableOpacity
          onPress={() => onHandleCheck()}
          style={styles.checkRound}>
          {check && <FontAwesome5 style={styles.check} name={'check'} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchText}
          onPress={() => onHandleFlipCard()}>
          <Text style={styles.text}>{textEn}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.volume}
          onPress={() => onHandleVolume()}>
          <FontAwesome5
            style={styles.volumeIcon}
            name={'volume-up'}
            color="#9D9D9D"
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height; // 768

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    height: windowHeight * 0.05,
    margin: 5,
  },
  container: {
    height: windowHeight * 0.05,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.25)',
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    fontFamily: 'HoonPinkpungchaR',
    backfaceVisibility: 'hidden',
    position: 'absolute',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  check: {
    color: '#19DC4D',
    fontSize: 14,
  },
  checkRound: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#DBDBDB',
    borderRadius: 1000,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchText: {
    minWidth: windowWidth * 0.06,
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'HoonPinkpungchaR',
    marginLeft: 12,
  },
  volume: {
    marginLeft: 12,
  },
  volumeIcon: {
    fontSize: 20,
  },
  back: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
  },
  button: {
    fontSize: 100,
  },
});
