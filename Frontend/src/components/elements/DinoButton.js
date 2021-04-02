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

const checkCharacterImage = (src) => {
  if (src.indexOf('character1') !== -1) {
    return '#6EC2E2';
  }
  if (src.indexOf('character2') !== -1) {
    return '#BF8FFD';
  }
  if (src.indexOf('character3') !== -1) {
    return '#63D882';
  }
  if (src.indexOf('character4') !== -1) {
    return '#E96C59';
  }
  if (src.indexOf('character5') !== -1) {
    return '#68C6DD';
  }
};

export default function DinoButton({
  imgSrc,
  childName,
  onHandlePress,
  widthProps,
  effectDisalbe,
  active,
}) {
  const imageUri = Image.resolveAssetSource(imgSrc).uri;

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
            backgroundColor: checkCharacterImage(imageUri),
            width: widthProps * 1.2 || width * 0.11,
            height: widthProps * 1.2 || width * 0.11,
          },
        ]}>
        <Image
          source={imgSrc}
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
  containerPress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    elevation: 7,
    marginHorizontal: width * 0.02,
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
