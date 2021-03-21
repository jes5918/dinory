import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function CheckBox({textEn, textKr}) {
  const animatedValue = new Animated.Value(0);
  let value = 0;
  animatedValue.addListener((e) => {
    console.log(value);
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

  const flipCard = () => {
    if (value >= 90) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        // friction: 8,
        // tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 200,
        // friction: 8,
        // tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => flipCard()}
      style={styles.box}>
      {/* front */}
      <Animated.View style={[frontAnimatedStyle]}>
        <TouchableOpacity style={[styles.container, styles.front]}>
          <View style={styles.left}>
            <TouchableOpacity
              // onPress={() => flipCard()}
              style={styles.checkRound}
              name={'check'}>
              <FontAwesome5 style={styles.check} name={'check'} />
            </TouchableOpacity>
            <Text style={styles.text}>{textEn}</Text>
          </View>
          <View>
            <FontAwesome5
              style={styles.volume}
              name={'volume-up'}
              color="#9D9D9D"
            />
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* back */}
      <Animated.View style={[backAnimatedStyle]}>
        <TouchableOpacity
          style={[styles.container, styles.back, backAnimatedStyle]}>
          <TouchableOpacity style={styles.left}>
            <View style={styles.checkRound} name={'check'} />
            <Text style={styles.text}>{textKr}</Text>
          </TouchableOpacity>
          <View>
            <FontAwesome5
              style={styles.volume}
              name={'volume-up'}
              color="#9D9D9D"
            />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'relative',
    width: 170,
    height: 38,
  },
  container: {
    width: 170,
    height: 38,
    borderRadius: 50,
    backgroundColor: '#19DC4D',
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
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'HoonPinkpungchaR',
    marginLeft: 12,
  },
  volume: {
    fontSize: 20,
  },
  back: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
  },
});
