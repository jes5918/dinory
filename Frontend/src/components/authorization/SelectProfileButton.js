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

export default function SelectProfileButton({
  imageSrc,
  Name,
  onHandlePress,
  widthProps,
  effectDisalbe,
  active,
}) {
  const imageUri = Image.resolveAssetSource(imageSrc).uri;

  return (
    <TouchableOpacity
      disabled={effectDisalbe ? true : false || false}
      activeOpacity={0.7}
      onPress={() =>
        onHandlePress ? onHandlePress() : alert('함수를 props로 내려주세요!')
      }>
      <>
        <View
          style={[
            active ? styles.container : styles.containerPress,
            {
              backgroundColor: checkCharacterImage(imageUri),
              width: widthProps * 1.2 || width * 0.11,
              height: widthProps * 1.2 || width * 0.11,
            },
          ]}>
          <Image
            source={imageSrc}
            style={[
              styles.characterImage,
              {
                width: widthProps || width * 0.09,
                height: widthProps || width * 0.09,
              },
            ]}
          />
        </View>
        {Name && <Text style={styles.nameText}>{Name}</Text>}
      </>
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    elevation: 7,
    marginHorizontal: width * 0.02,
  },
  containerPress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    elevation: 7,
    marginHorizontal: width * 0.02,
    elevation: 5,
  },
  characterImage: {
    resizeMode: 'contain',
  },
  nameText: {
    fontFamily: 'HoonPinkpungchaR',
    alignSelf: 'center',
    fontSize: height * 0.05,
    margin: height * 0.02,
  },
});
