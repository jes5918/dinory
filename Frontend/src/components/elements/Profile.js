import React, {useState, useEffect, useCallback} from 'react';
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
  const [childName, setChildName] = useState('');
  const [childCharacter, setChildCharacter] = useState('');

  const getProfileInfo = useCallback(async () => {
    await AsyncStorage.getItem('profile').then((profile) => {
      const data = JSON.parse(profile);
      setChildName(data.profile_name);
      setChildCharacter(data.profile_image);
      // 에러남 확인 필요
      // setChildCharacter("require('../../assets/images/background1.png')");
      // console.log('profile.js : ', childName);
      // console.log('profile.js : ', childCharacter);
    });
  }, []);
  // }, [childName, childCharacter]);

  useEffect(() => {
    getProfileInfo();
  }, [getProfileInfo]);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ChildSetting')}>
      <Text style={styles.childName}>{childName}</Text>
      <View style={styles.characterOutside}>
        <View style={styles.characterContainer}>
          <Image style={styles.characterIcon} source={childCharacter} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: width * 0.25,
  },
  childName: {
    fontFamily: 'HoonPinkpungchaR',
    textAlignVertical: 'center',
    color: '#000',
    fontSize: height * 0.04,
    textShadowColor: '#fff',
    textShadowOffset: {width: -2, height: 2},
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
    marginHorizontal: width * 0.02,
  },
});
