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

export default function DinoButton({imgSrc, childName}) {
  const imageUri = Image.resolveAssetSource(imgSrc).uri;
  
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <View
        style={[
          styles.container,
          {backgroundColor: checkCharacterImage(imageUri)},
        ]}>
        <Image source={imgSrc} style={styles.characterImage} />
      </View>
      {childName && <Text style={styles.nameText}>{childName}</Text>}
    </TouchableOpacity>
  );
}
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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: width * 0.11,
    height: width * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    elevation: 7,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  characterImage: {
    resizeMode: 'contain',
    width: width * 0.1,
    height: width * 0.1,
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
