import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function Profile() {
  const navigation = useNavigation();
  const [childName, setChildName] = useState(childName);

  AsyncStorage.getItem('ProfileName', (err, result) => {
    if ('ProfileName' !== null) {
      setChildName(result);
    } else {
      console.log(err);
    }
  });

  // 캐릭터를 못찾겠어요. 우리 모든 key를 불러와 볼까요?
  // AsyncStorage.getAllKeys().then(console.log);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ChildSetting')}>
      <Text style={styles.childName}>{childName}</Text>
      <View style={styles.characterOutside}>
        <View style={styles.characterContainer}>
          <Image
            style={styles.characterIcon}
            source={require('../../assets/images/character4.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: width * 0.12,
  },
  childName: {
    fontFamily: 'HoonPinkpungchaR',
    alignSelf: 'center',
    color: '#000',
    fontSize: height * 0.04,
    textShadowColor: '#fff',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 7,
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
