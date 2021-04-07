import React, {useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/elements/Header';
import ContentTitle from '../../components/elements/ContentTitle';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import DinoButton from '../../components/elements/DinoButton';
import ChangeProfile from '../../components/elements/ChangeProfile';
import DialButton from '../../components/elements/DialButton';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../../components/elements/AlertModal';

import {useNavigation, useFocusEffect} from '@react-navigation/core';
import {editChildProfile} from '../../api/accounts/childSettings';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function ChildSetting() {
  const [modalVisible, setModalVisible] = useState(false);
  const [fmodalVisible, setfModalVisible] = useState(false);
  const [bmodalVisible, setbModalVisible] = useState(false);
  const [isChangeName, setIschangeName] = useState(false);
  const [isChangeBirth, setIschangeBirth] = useState(false);
  const [isChangePic, setIschangePic] = useState(false);
  const [childNName, setChildNName] = useState('');
  const [childBirth, setChildBirth] = useState('');
  const [dinoPicNum, setDinoPicNum] = useState('');
  const [originName, setOriginName] = useState('');
  const [originBirth, setOriginBirth] = useState('');
  const [child, setChild] = useState('');
  const [voiceNum, setVoiceNum] = useState('');

  const navigation = useNavigation();
  const url = require('../../assets/images/background2.png');

  let dinoArray = {
    0: require('../../assets/images/character1.png'),
    1: require('../../assets/images/character2.png'),
    2: require('../../assets/images/character3.png'),
    3: require('../../assets/images/character4.png'),
    4: require('../../assets/images/character5.png'),
  };

  let dinoPic = dinoArray[dinoPicNum];
  let today = new Date();
  let year = today.getFullYear();

  const dialFunction = (data) => {
    if (childBirth.length <= 5) {
      if (data !== '지우개') {
        if (childBirth.length <= 3) {
          setChildBirth(childBirth.concat(data));
        } else {
          changeModalState(3);
        }
      } else {
        setChildBirth(childBirth.slice(0, -1));
      }
    } else {
      if (data === '지우개') {
        setChildBirth(childBirth.slice(0, -1));
      }
    }
  };
  // 변경요청
  const submitChangeInfo = () => {
    if ((childBirth >= year || childBirth <= year - 100) && childBirth !== '') {
      changeModalState(3);
    } else if (childBirth < year && childBirth > 1900) {
      mkFormdata();
    } else {
      setChildBirth(originBirth);
      mkFormdata();
    }
  };

  const mkFormdata = () => {
    setTimeout(() => {
      const formData = new FormData();
      formData.append(
        'name',
        childNName !== originName && childNName.length !== 0
          ? childNName
          : originName,
      );
      formData.append(
        'year',
        childBirth !== originBirth && childBirth.length !== 0
          ? childBirth
          : originBirth,
      );
      formData.append('img', dinoPicNum);

      editChildProfile(
        child,
        formData,
        (res) => {
          if (res.status === 201) {
            const profileData = {
              profile_pk: child,
              profile_image: dinoPicNum,
              profile_name:
                childNName !== originName && childNName.length !== 0
                  ? childNName
                  : originName,
              profile_year:
                childBirth !== originBirth && childBirth.length !== 0
                  ? childBirth
                  : originBirth,
              voice_pk: voiceNum,
            };
            AsyncStorage.mergeItem('profile', JSON.stringify(profileData));
            changeModalState(1);
            setTimeout(() => {
              navigation.navigate('Main');
            }, 2000);
          } else {
            changeModalState(2);
          }
        },
        (err) => {
          changeModalState(2);
        },
      );
    }, 1000);
  };
  // 상태 변경
  const closeModal = (num) => {
    setTimeout(() => {
      if (num === 1) {
        setModalVisible(!modalVisible);
      } else if (num === 2) {
        setfModalVisible(!fmodalVisible);
      } else if (num === 3) {
        setbModalVisible(!bmodalVisible);
      }
    }, 1500);
  };
  const changeModalState = (num) => {
    if (num === 1) {
      setModalVisible(!modalVisible);
    } else if (num === 2) {
      setfModalVisible(!fmodalVisible);
    } else if (num === 3) {
      setbModalVisible(!bmodalVisible);
    }
  };

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('profile').then((profile) => {
        const data = JSON.parse(profile);
        setChild(data.profile_pk);
        setOriginName(data.profile_name);
        setDinoPicNum(data.profile_image);
        setOriginBirth(String(data.profile_year));
        setVoiceNum(data.voice_pk);
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <BackgroundAbsolute imageSrc={url}>
        <Header />
        <View style={styles.body}>
          <ContentTitle title={'나의 정보를 변경해 보아요!'} />
          <View style={styles.scrollContainer}>
            <ScrollView>
              <View style={styles.dualBody}>
                <Layout
                  width={width * 0.37}
                  height={height * 0.6}
                  opacity={0.8}>
                  <View style={styles.innerMiddle}>
                    <View style={styles.inLine}>
                      <Text style={styles.myInfo}>저는</Text>
                      <TextInput
                        style={styles.textInput}
                        placeholder={originName}
                        autoCompleteType={'off'}
                        placeholderTextColor="#6e6e6e"
                        maxLength={8}
                        onFocus={() => [
                          setIschangeName(true),
                          setIschangeBirth(false),
                          setIschangePic(false),
                        ]}
                        value={childNName}
                        onChangeText={(text) => setChildNName(text)}
                      />
                      <Text style={styles.myInfo}>입니다</Text>
                    </View>
                    <View style={styles.inLine}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => [
                          setIschangeName(false),
                          setIschangeBirth(true),
                          setIschangePic(false),
                        ]}>
                        <View
                          style={styles.birthContainer}
                          onPress={() => [
                            setIschangeName(false),
                            setIschangeBirth(true),
                            setIschangePic(false),
                          ]}>
                          {childBirth.length === 0 ? (
                            <Text
                              style={[styles.birthText, {color: '#6e6e6e'}]}>
                              {originBirth}
                            </Text>
                          ) : (
                            <Text style={styles.birthText}>{childBirth}</Text>
                          )}
                        </View>
                      </TouchableOpacity>
                      <Text style={styles.myInfo}>년에 태어났구요</Text>
                    </View>
                    <View style={styles.inLine}>
                      <Text style={styles.myInfo}>저의 캐릭터는</Text>
                    </View>
                    <View style={styles.inLine}>
                      <View
                        style={styles.myDino}
                        onTouchStart={() => [
                          setIschangeName(false),
                          setIschangeBirth(false),
                          setIschangePic(true),
                        ]}>
                        <DinoButton
                          imgSrc={
                            dinoPic || require('../../assets/images/egg.png')
                          }
                          widthProps={width * 0.08}
                          effectDisalbe={true}
                        />
                      </View>
                      <Text style={styles.myInfo}>이예요!</Text>
                    </View>
                  </View>
                </Layout>
                <Layout
                  width={width * 0.37}
                  height={height * 0.6}
                  opacity={0.8}>
                  <View style={styles.innerContext}>
                    {isChangeName && <Text> </Text>}
                    {isChangeBirth && (
                      <DialButton
                        size={width * 0.05}
                        verMargin={height * 0.02}
                        horMargin={width * 0.01}
                        deleteSize={width * 0.04}
                        inputFunc={dialFunction}
                      />
                    )}
                    {isChangePic && (
                      <ChangeProfile setDinoPicNum={setDinoPicNum} />
                    )}
                  </View>
                  <View style={styles.submitBtn}>
                    <BasicButton
                      text={'변경완료'}
                      btnWidth={width * 0.2}
                      onHandlePress={() => {
                        submitChangeInfo();
                      }}
                    />
                  </View>
                  <AlertModal
                    modalVisible={modalVisible}
                    onHandleCloseModal={() => changeModalState(1)}
                    text={'내 정보가 수정되었어요!'}
                    iconName={'smileo'}
                    color={'green'}
                    setTimeFunction={() => closeModal(1)}
                  />
                  <AlertModal
                    modalVisible={fmodalVisible}
                    onHandleCloseModal={() => changeModalState(2)}
                    text={'다시 시도해주세요!'}
                    iconName={'frowno'}
                    color={'red'}
                    setTimeFunction={() => closeModal(2)}
                  />
                  <AlertModal
                    modalVisible={bmodalVisible}
                    onHandleCloseModal={() => changeModalState(3)}
                    text={'태어난 년도를 다시 확인해볼까요?'}
                    iconName={'frowno'}
                    color={'red'}
                    setTimeFunction={() => closeModal(3)}
                  />
                </Layout>
              </View>
            </ScrollView>
          </View>
        </View>
      </BackgroundAbsolute>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 6,
    alignItems: 'center',
    marginTop: height * 0.17,
  },
  dualBody: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: height * 0.035,
    marginHorizontal: width * 0.1,
  },
  innerMiddle: {
    flex: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  myInfo: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: height * 0.04,
    marginHorizontal: height * 0.015,
    textAlign: 'center',
  },
  inLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: height * 0.04,
    color: '#FB537B',
    width: height * 0.35,
    height: height * 0.1,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 7,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  myDino: {
    display: 'flex',
    width: width * 0.1,
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    elevation: 7,
    backgroundColor: '#FB537B',
    borderColor: '#fff',
    borderWidth: 3,
  },
  innerContext: {
    flex: 4,
    justifyContent: 'center',
  },
  submitBtn: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  birthContainer: {
    width: width * 0.1,
    height: height * 0.1,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 7,
    justifyContent: 'center',
  },
  birthText: {
    textAlign: 'center',
    fontSize: height * 0.04,
    color: '#FB537B',
  },
});
