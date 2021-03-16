import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import BouncingPreloader from 'react-native-bouncing-preloader';

const icons = [
  require('../assets/그림자 없는 코끼리.png'),
  null,
  require('../assets/알에앉은노란공룡이.png'),
  require('../assets/그림자없는곰.png'),
  require('../assets/알에앉은주황공룡이.png'),
  null,
  require('../assets/알에앉은진한초록공룡이.png'),
  require('../assets/사자.png'),
];

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BouncingPreloader
          icons={icons}
          leftDistance={-200}
          rightDistance={-50}
          speed={1200}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
