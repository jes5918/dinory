import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  View,
} from 'react-native';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function Profile(/*{childName,childCharacter}*/) {
  return (
    <TouchableOpacity style={styles.container}>
      {/* <Text style={styles.childName}>{childName}</Text> */}
      <Text style={styles.childName}>채아</Text>
      <View style={styles.characterOutside}>
        <View style={styles.characterContainer}>
          <Image
            style={styles.characterIcon}
            // source={childCharacter}
            source={require('../../assets/images/character4.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-evenly',
    alignSelf: 'flex-end',
    width: width * 0.12,
    top: height * 0.02,
    right: width * 0.02,
  },
  childName: {
    fontFamily: 'HoonPinkpungchaR',
    alignSelf: 'center',
    color: 'white',
    fontSize: height * 0.04,
  },
  characterIcon: {
    resizeMode: 'center',
    width: height * 0.05,
    height: height * 0.05,
  },
  characterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: height * 0.075,
    height: height * 0.075,
    backgroundColor: '#fff',
    borderColor: '#ECECEC',
    borderWidth: 2,
    borderRadius: 75,
  },
  characterOutside: {
    alignItems: 'center',
    justifyContent: 'center',
    width: height * 0.085,
    height: height * 0.085,
    backgroundColor: '#fff',
    borderRadius: 75,
  },
});
