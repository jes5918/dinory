import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import SelectLayout from '../../../components/elements/SelectLayout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ArrowButton from '../../../components/elements/ArrowButton';
import ContentTitle from '../../../components/elements/ContentTitle';
import Layout from '../../../components/elements/Layout';
import {getChildProfile} from '../../../api/accounts/childSettings';
import AsyncStorage from '@react-native-community/async-storage';
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;
export default function SelectProfile({navigation}) {
  useEffect(() => {
    AsyncStorage.getItem('jwt').then((value) => {
      console.log(value);
    });
    getChildProfile(
      (res) => {
        setChildrenInfo(res.data);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);
  const [childrenInfo, setChildrenInfo] = useState(childrenInfo);
  const imageSrc = require('../../../assets/images/background2.png');
  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <View style={styles.start}>
        <View>
          <ArrowButton onHandlePress={() => navigation.goBack()}></ArrowButton>
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}></Image>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.view}>
          <ContentTitle title={'프로필을 선택하세요'}></ContentTitle>
        </View>
        <View>
          <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.bodyCardContainer}>
              <View style={styles.body}>
                {childrenInfo &&
                  childrenInfo.map((profile) => {
                    const {id, img, name, parent, voice, year} = profile;
                    return (
                      <View key={id}>
                        <Text> {name}</Text>
                      </View>
                    );
                  })}
              </View>
            </ScrollView>
          </Layout>
        </View>
      </View>
      <View style={styles.end}></View>
    </BackgroundAbsolute>
  );
}

const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  start: {
    flex: 1.5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 220, //595
    height: undefined, //101
    aspectRatio: 300 / 100,
  },
  view: {
    marginBottom: 26,
    zIndex: 3,
  },
  body: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  end: {
    flex: 1,
  },
  bodyCardContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 100,
    paddingLeft: windowWidth * 0.12,
  },
});
