import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

// component
import Profile from '../../components/elements/Profile';
import ArrowButton from '../../components/elements/ArrowButton';

// imageSrc
const url = require('../../assets/images/background1.png');

// footer component
// const footerImage = () => {
//   return (
//     <View>
//       <Text></Text>
//     </View>
//   )
// }

function DiaryList() {
  return (
    <View style={styles.container}>
      <ImageBackground source={url} style={styles.backgroundImage} />
      <View style={styles.header}>
        <ArrowButton />
        <Profile />
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>DiaryList Page</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>DiaryList Page</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  header: {
    display: 'flex',
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'lightcoral',
  },
  body: {
    flex: 5,
    width: '100%',
    backgroundColor: 'lightblue',
  },
  footer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'lightyellow',
  },
  text: {
    fontSize: 40,
  },
});

export default DiaryList;
