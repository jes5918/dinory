import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  // Keyboard,
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

import {useNavigation} from '@react-navigation/core';
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
  const [originName, setOriginName] = useState(originName);
  const [originBirth, setOriginBirth] = useState(originBirth);
  // const [originPic, setOriginPic] = useState(originPic);

  const navigation = useNavigation();
  const url = require('../../assets/images/background2.png');
  const child = '10'; // 임시값

  let dinoArray = {
    1: require('../../assets/images/character1.png'),
    2: require('../../assets/images/character2.png'),
    3: require('../../assets/images/character3.png'),
    4: require('../../assets/images/character4.png'),
    5: require('../../assets/images/character5.png'),
  };

  let dinoPic = dinoArray[dinoPicNum];
  // 생년입력(민호체크)
  let today = new Date();
  let year = today.getFullYear();

  const dialFunction = (data) => {
    if (childBirth.length !== 4) {
      if (data !== '지우개') {
        setChildBirth(childBirth.concat(data));
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
    if (childBirth >= year || childBirth <= 1900) {
      bchangeModalState();
    } else if (childBirth < year && childBirth > 1900) {
      const formData = new FormData();
      formData.append(
        'name',
        childNName !== '' ? String(childNName) : originName,
      );
      formData.append(
        'year',
        childBirth !== 0 ? Number(childBirth) : originBirth,
      );
      // 받아오는게 없어서 에러남. 나중에 수정
      // formData.append('img', dinoPicNum !== 0 ? Number(dinoPicNum) : originPic);
      console.log(formData);
      editChildProfile(
        child,
        formData,
        (res) => {
          if (res.status === 201) {
            changeModalState();
            setTimeout(() => {
              navigation.navigate('Main');
            }, 2000);
          } else {
            fchangeModalState();
          }
        },
        (err) => {
          console.log(err);
          fchangeModalState();
        },
      );
    }
  };

  // 상태 변경
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 1500);
  };
  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };
  const fcloseModal = () => {
    setTimeout(() => {
      setfModalVisible(!fmodalVisible);
    }, 2000);
  };
  const fchangeModalState = () => {
    setfModalVisible(!fmodalVisible);
  };
  const bcloseModal = () => {
    setTimeout(() => {
      setbModalVisible(!bmodalVisible);
    }, 2000);
  };
  const bchangeModalState = () => {
    setbModalVisible(!bmodalVisible);
  };

  // 로컬스토리지 정보 추출
  AsyncStorage.getItem('ProfileName', (err, result) => {
    if ('ProfileName' !== null) {
      setOriginName(result);
    } else {
      console.log(err);
    }
  });
  AsyncStorage.getItem('ProfileYear', (err, result) => {
    if ('ProfileYear' !== null) {
      // setChildBirth(result);
    } else {
      console.log(err);
    }
  });
  // AsyncStorage.getAllKeys().then(console.log);

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
                        // 수정해야함
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
                          <Text value={originBirth} style={styles.birthText}>
                            {childBirth}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {/* <TextInput
                        autoCompleteType={'off'}
                        style={styles.numInput}
                        // 수정해야함
                        placeholder={originBirth}
                        placeholderTextColor="#6e6e6e"
                        maxLength={4}
                        // whenever using software keyboard
                        // keyboardType={'numeric'} // 숫자 입력만 가능하도록(키보드 사용시)
                        showSoftInputOnFocus={false} // 눌렀을 때 소프트웨어 키보드 팝업 안뜨게 하기
                        onFocus={() => [
                          setIschangeName(false),
                          setIschangeBirth(true),
                          setIschangePic(false),
                          Keyboard.dismiss(), // focus가 생겼을 때 키보드 끄기
                        ]}
                        value={childBirth}
                        onChange={(text) => setChildBirth(text)}
                      /> */}
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
                      <DialButton // 민호체크
                        size={width * 0.06}
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
                    onHandleCloseModal={() => changeModalState()}
                    text={'내 정보가 수정되었어요!'}
                    iconName={'smileo'}
                    setTimeFunction={() => closeModal()}
                  />
                  <AlertModal
                    modalVisible={fmodalVisible}
                    onHandleCloseModal={() => fchangeModalState()}
                    text={'다시 시도해주세요!'}
                    iconName={'frowno'}
                    setTimeFunction={() => fcloseModal()}
                  />
                  <AlertModal
                    modalVisible={bmodalVisible}
                    onHandleCloseModal={() => bchangeModalState()}
                    text={'태어난 년도를 다시 확인해볼까요?'}
                    iconName={'frowno'}
                    setTimeFunction={() => bcloseModal()}
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
    marginHorizontal: 10,
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
    height: height * 0.08,
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 7,
  },
  // numInput: {
  //   fontFamily: 'HoonPinkpungchaR',
  //   fontSize: height * 0.04,
  //   color: '#FB537B',
  //   width: height * 0.2,
  //   height: height * 0.08,
  //   textAlign: 'center',
  //   backgroundColor: '#fff',
  //   borderRadius: 20,
  //   elevation: 7,
  // },
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
    height: height * 0.08,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 7,
    justifyContent: 'center',
  },
  birthText: {
    textAlign: 'center',
    fontSize: height * 0.04,
  },
});
