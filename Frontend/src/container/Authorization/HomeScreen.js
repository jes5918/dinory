import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
export default function HomeScreen({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.3718;
  const layoutHeight = windowHeight * 0.708;
  return (
    <ImageBackground
      source={require('../../assets/images/background5.png')}
      style={styles.container}>
      <View style={styles.view}>
        <View style={styles.logo}>
          <Image source={require('../../assets/images/logo.png')}></Image>
        </View>
      </View>
      <View>
        <Layout width={layoutWidth} height={layoutHeight} opacity={0}>
          <View style={styles.body}>
            <View style={styles.view}>
              <View style={styles.button_mg}>
                <BasicButton
                  text={'회원가입'}
                  customFontSize={24}
                  paddingHorizon={24}
                  paddingVertical={11}
                  btnWidth={336}
                  btnHeight={73}
                  borderRadius={14}
                  onHandlePress={() =>
                    navigation.navigate('EmailAuthorization')
                  }></BasicButton>
              </View>
              <View style={styles.button_mg}>
                <BasicButton
                  text={'로그인'}
                  customFontSize={24}
                  paddingHorizon={24}
                  paddingVertical={11}
                  btnWidth={336}
                  btnHeight={73}
                  borderRadius={14}
                  onHandlePress={() =>
                    navigation.navigate('LoginScreen')
                  }></BasicButton>
              </View>
            </View>
          </View>
        </Layout>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_mg: {
    margin: 32,
  },
  logo: {
    width: 595, //595
    height: 101, //101
    marginTop: 50,
    flex: 1,
  },
  body: {
    flex: 4,
  },
});
