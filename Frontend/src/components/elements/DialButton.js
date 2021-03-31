import React from 'react';
import zero from '../../assets/images/number/0.png';
import one from '../../assets/images/number/1.png';
import two from '../../assets/images/number/2.png';
import three from '../../assets/images/number/3.png';
import four from '../../assets/images/number/4.png';
import five from '../../assets/images/number/5.png';
import six from '../../assets/images/number/6.png';
import seven from '../../assets/images/number/7.png';
import eight from '../../assets/images/number/8.png';
import nine from '../../assets/images/number/9.png';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';

export default function DialButton({
  size,
  verMargin,
  horMargin,
  deleteSize,
  inputFunc,
}) {
  const sendDial = (data) => {
    inputFunc(data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowConatiner}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => sendDial(1)}>
          <Image
            source={one}
            style={[
              styles.numImage,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => sendDial(2)}>
          <Image
            source={two}
            style={[
              styles.numImage,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => sendDial(3)}>
          <Image
            source={three}
            style={[
              styles.numImage,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => sendDial(4)}>
          <Image
            source={four}
            style={[
              styles.numImage,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rowConatiner}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => sendDial(5)}>
          <Image
            source={five}
            style={[
              styles.numImage,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.test}
          activeOpacity={0.7}
          onPress={() => sendDial(6)}>
          <Image
            source={six}
            style={[
              styles.numImage,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => sendDial(7)}>
          <Image
            source={seven}
            style={[
              styles.numImage,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rowConatiner}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => sendDial(8)}>
          <Image
            source={eight}
            style={[
              styles.numImage,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => sendDial(9)}>
          <Image
            source={nine}
            style={[
              styles.numImage,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => sendDial(0)}>
          <Image
            source={zero}
            style={[
              styles.numImage,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => sendDial('지우개')}>
          <View
            style={[
              styles.arrowIcon,
              {
                width: size,
                height: size,
                marginVertical: verMargin,
                marginHorizontal: horMargin,
              },
            ]}>
            <FontAwesome5Icon
              style={[
                {
                  fontSize: deleteSize,
                },
              ]}
              name={'arrow-left'}
              color="white"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowConatiner: {
    display: 'flex',
    flexDirection: 'row',
  },
  numImage: {
    resizeMode: 'contain',
  },
  arrowIcon: {
    backgroundColor: '#585858',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
