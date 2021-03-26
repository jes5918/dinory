import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
export default function HomeScreen({navigation}) {
  const windowSize = Dimensions.get('window');
  const windowWidth = windowSize.width; // 1280
  const windowHeight = windowSize.height; // 768 //752
  const layoutWidth = windowWidth * 0.5;
  const layoutHeight = windowHeight * 0.708;
  return (
    <ScrollView style={styles.scroll}>
      <ImageBackground
        source={require('../../assets/images/background5.png')}
        style={styles.container}>
        <View style={styles.view_logo}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_logo: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
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
