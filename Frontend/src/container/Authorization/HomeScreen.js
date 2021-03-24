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
export default function HomeScreen(props) {
  const {navigate} = props.navigation;
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768
  const layoutWidth = windowWidth * 0.3718;
  const layoutHeight = windowHeight * 0.708;
  return (
    <ImageBackground
      source={require('../../assets/images/background5.png')}
      style={styles.container}>
      <Image
        source={require('../../assets/images/logo4.png')}
        style={styles.logo}></Image>
      <View style={styles.body}>
        <Layout width={layoutWidth} height={layoutHeight} opacity={0.7}>
          <View style={styles.view}>
            <View style={styles.button_mg}>
              <BasicButton
                text={'회원가입'}
                customFontSize={24}
                paddingHorizon={24}
                paddingVertical={11}
                btnWidth={336}
                btnHeight={58}
                borderRadius={14}
                onPressHandle={() =>
                  navigate('EmailAuthorization')
                }></BasicButton>
            </View>
            <View style={styles.button_mg}>
              <BasicButton
                text={'로그인'}
                customFontSize={24}
                paddingHorizon={24}
                paddingVertical={11}
                btnWidth={336}
                btnHeight={58}
                borderRadius={14}
                onPressHandle={() => navigate('LoginScreen')}></BasicButton>
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
    // justifyContent: 'center',
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_mg: {
    margin: 32,
  },
  logo: {
    width: 300, //595
    height: undefined, //101
    aspectRatio: 200 / 80,
    marginBottom: 40,
    flex: 1,
  },
  body: {
    flex: 4,
  },
});
