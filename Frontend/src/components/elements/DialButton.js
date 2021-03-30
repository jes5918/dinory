import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
} from 'react-native';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function DialButton({
  childName,
  onHandlePress,
  widthProps,
  effectDisalbe,
}) {
  return (
    <TouchableOpacity
      disabled={effectDisalbe ? true : false || false}
      activeOpacity={0.7}
      onPress={() =>
        onHandlePress ? onHandlePress() : alert('함수를 props로 내려주세요!')
      }>
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#ffffff',
            width: widthProps * 1.2 || width * 0.11,
            height: widthProps * 1.2 || width * 0.11,
          },
        ]}>
        <Image
          style={[
            styles.characterImage,
            {
              width: widthProps || width * 0.09,
              height: widthProps || width * 0.09,
            },
          ]}
        />
      </View>
      {childName && <Text style={styles.nameText}>{childName}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    elevation: 7,
    marginHorizontal: width * 0.01,
  },
  characterImage: {
    resizeMode: 'contain',
  },
  nameText: {
    fontFamily: 'HoonPinkpungchaR',
    alignSelf: 'center',
    fontSize: height * 0.05,
  },
  nullNameText: {
    fontFamily: 'HoonPinkpungchaR',
    alignSelf: 'center',
    fontSize: 100,
    backgroundColor: 'red',
  },
});
