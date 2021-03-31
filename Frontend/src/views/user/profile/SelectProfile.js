import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
// import SelectLayout from '../../../components/elements/SelectLayout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ArrowButton from '../../../components/elements/ArrowButton';
import ContentTitle from '../../../components/elements/ContentTitle';
import Layout from '../../../components/elements/Layout';
import {getChildProfile} from '../../../api/accounts/childSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectProfileButton from '../../../components/authorization/SelectProfileButton';
import BasicButton from '../../../components/elements/BasicButton';

// static variable
const windowSize = Dimensions.get('window');
const windowWidth = windowSize.width;
const windowHeight = windowSize.height; // 752

export default function SelectProfile({navigation}) {
  const [childrenInfo, setChildrenInfo] = useState(null);
  const imageSrc = require('../../../assets/images/background2.png');

  const transformImage = (num) => {
    let Src = '';
    console.log('num : ', num);
    console.log('num Type : ', typeof num);
    switch (String(num)) {
      case '1':
        Src = '../../../assets/images/character1.png';
        break;
      case '2':
        Src = '../../../assets/images/character2.png';
        break;
      case '3':
        Src = '../../../assets/images/character3.png';
        break;
      case '4':
        Src = '../../../assets/images/character4.png';
        break;
      default:
        Src = '../../../assets/images/character5.png';
        break;
    }
    return Src;
  };

  useEffect(() => {
    getChildProfile(
      (res) => {
        setChildrenInfo(res.data);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <View style={styles.start}>
        <View>
          <ArrowButton onHandlePress={() => navigation.goBack()} />
        </View>
        <View style={styles.logo}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.view}>
          <ContentTitle title={'프로필을 선택하세요'} />
        </View>
        <View>
          <Layout
            width={windowWidth * 0.8}
            height={windowHeight * 0.6}
            opacity={0.8}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.bodyCardContainer}>
              {childrenInfo &&
                childrenInfo.map((profile) => {
                  const {id, img, name, voice, year} = profile;
                  const onButtonClick = () => {
                    const profileData = {
                      profile_pk: id,
                      profile_image: img,
                      profile_name: name,
                      profile_year: year,
                      voice_pk: voice,
                    };
                    AsyncStorage.setItem(
                      'profile',
                      JSON.stringify(profileData),
                    );
                    navigation.navigate('Main');
                  };
                  return (
                    <View key={id}>
                      <SelectProfileButton
                        imageSrc={profileImg}
                        Name={name}
                        onHandlePress={onButtonClick}
                      />
                    </View>
                  );
                })}
            </ScrollView>
            <BasicButton
              text={'프로필 추가하기'}
              customFontSize={32}
              onHandlePress={() => {
                navigation.navigate('NameProfile');
              }}
              margin={30}
            />
          </Layout>
        </View>
      </View>
      <View style={styles.end} />
    </BackgroundAbsolute>
  );
}

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
    // flexDirection: 'row',
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
