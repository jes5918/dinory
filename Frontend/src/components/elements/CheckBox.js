import React, {useState} from 'react';
import {Text, View, StyleSheet, Animated, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function CheckBox({textEn, textKr}) {
  const [check, setCheck] = useState(false);

  // 카드 애니메이션
  const animatedValue = new Animated.Value(0);
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

  // 배경 애니메이션(괄호 주석이 살아있으면 적용이 되지않은 상태입니다.)
  const backAnimatedStyle = {
    transform: [
      {
        rotateY: backInterpolate,
      },
    ],
  };

  const backgroundAnimateValue = new Animated.Value(0);

  const interpolateColor = backgroundAnimateValue.interpolate({
    inputRange: [0, 150],
    outputRange: ['rgb(100,100,100)', 'rgb(250,250,250)'],
  });

  const backgroundAnimateStyle = {
    backgroundColor: interpolateColor,
  };

  // Method 정의

  const onHandleFlipCard = () => {
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
  };

  const onHandleCheck = () => {
    setCheck((prevCheck) => !prevCheck);
    // Check API 들어갈 부분.

    // backgroundColor Change
    // Animated.timing(backgroundAnimateValue, {
    //   toValue: 150,
    //   duration: 1000,
    //   useNativeDriver: true,
    // }).start();
  };

  const onHandleVolume = () => {
    console.log('Volume Part');
  };

  return (
    <View style={styles.box}>
      {/* front */}
      <Animated.View
        style={[
          styles.container,
          styles.front,
          frontAnimatedStyle,
          // backgroundAnimateStyle,
          {backgroundColor: check ? '#19DC4D' : 'white'},
        ]}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => onHandleCheck()}
            style={styles.checkRound}>
            {check && <FontAwesome5 style={styles.check} name={'check'} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchText}
            onPress={() => onHandleFlipCard()}
            name={'check'}>
            <Text style={styles.text}>{textEn}</Text>
          </TouchableOpacity>
        </View>
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
          // backgroundAnimateStyle,
          {backgroundColor: check ? '#19DC4D' : 'white'},
        ]}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => onHandleCheck()}
            style={styles.checkRound}>
            {check && <FontAwesome5 style={styles.check} name={'check'} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchText}
            onPress={() => onHandleFlipCard()}>
            <Text style={styles.text}>{textKr}</Text>
          </TouchableOpacity>
        </View>
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

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height;

console.log(windowSize, windowHeight, windowWidth);

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    minWidth: windowWidth * 0.13,
    minHeight: windowHeight * 0.05,
  },
  container: {
    minWidth: windowWidth * 0.13,
    minHeight: windowHeight * 0.05,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
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
    width: windowWidth * 0.019,
    height: windowWidth * 0.019,
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
