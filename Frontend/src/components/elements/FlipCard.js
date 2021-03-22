import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bckgroundColor: '#fff',
  },
  card: {
    width: '50%',
    height: '50%',
    transform: [{rotateY: '180deg'}],
  },
  card2: {
    width: '50%',
    height: '50%',
    transform: [{rotateY: '0deg'}],
  },
  front: {
    // position: 'absolute',
    backgroundColor: 'pink',
    // backfaceVisibility: 'hidden',
  },
  back: {
    // position: 'absolute',
    backgroundColor: 'blue',
    transform: [{rotateY: '180deg'}],
    // backfaceVisibility: 'hidden',
  },
});

export default function FlipCard() {
  const [temp, settemp] = useState(false);
  const flip = () => {
    if (!temp) {
      settemp(true);
    } else {
      settemp(false);
    }
  };
  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity onPress={() => flip()}>
        <Animated.View title="apple" style={temp ? styles.card : styles.card2}>
          <Animated.View style={styles.front}>
            <Text>APPLE</Text>
          </Animated.View>
          <Animated.View style={styles.back}>
            <Text>사과</Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>

  );
}

{
  /* <div class="container">
  <div class="card" onclick="flip(event)">
    <div class="front">
      <h1>APPLE</h1>
      <p> Here is some additional text</p>
    </div>
    <div class="back">
      <h1>사과</h1>
    </div>
  </div>
</div>; */
}
