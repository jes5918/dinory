import React, {useState, useEffect} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Easing,
  Image,
  Dimensions,
} from 'react-native';

// 화면 크기 받아오기
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function LoadingSec() {
  const [moveAnim] = useState(new Animated.Value(-1200));

  useEffect(() => {
    Animated.loop(
      Animated.timing(moveAnim, {
        toValue: 1200,
        duration: 6000,
        // 알로 할 경우 주석 start
        easing: Easing.bezier(0.5, 0.55, 0.45, 0.1),
        // 알로 할경우 주석 end
        useNativeDriver: true,
      }),
    ).start();
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        style={[
          styles.movingItems,
          // 알로 할경우 주석 start
          {
            transform: [
              {
                translateX: moveAnim,
              },
            ],
          },
          // 알로 할경우 주석 end
        ]}
        // 알로 할경우 주석 start
        source={require('../../assets/images/loadingDino.gif')}
        // 알로 할경우 주석 end
        // source={require('../../assets/images/loadingEgg.gif')}
      />
      <Image
        style={styles.loadingText}
        source={require('../../assets/images/loadingText.gif')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movingItems: {
    alignItems: 'center',
    justifyContent: 'center',
    // 알로 할경우 주석 start
    resizeMode: 'center',
    width: width * 0.6,
    height: height * 0.4,
    // 알로 할경우 주석 end
  },
  loadingText: {
    height: height * 0.2,
    width: width * 0.4,
  },
});
