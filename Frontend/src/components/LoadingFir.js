import React from 'react';
import {View, StyleSheet} from 'react-native';
import BouncingPreloader from 'react-native-bouncing-preloader';

const icons = [
  require('../assets/egg.png'),
  null,
  require('../assets/character1.png'),
  require('../assets/character2.png'),
  require('../assets/character3.png'),
  null,
  require('../assets/character4.png'),
  require('../assets/character5.png'),
];

export default function LoadingFir() {
  return (
    <View>
      <View style={styles.container}>
        <BouncingPreloader
          icons={icons}
          leftDistance={-200}
          rightDistance={-150}
          speed={1000}
          useNativeDriver={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
