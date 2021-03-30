import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import Header from '../../components/elements/Header';
import ContentTitle from '../../components/elements/ContentTitle';
import Layout from '../../components/elements/Layout';
import BasicButton from '../../components/elements/BasicButton';
import DinoButton from '../../components/elements/DinoButton';
import ChangeProfile from '../../components/elements/ChangeProfile';
import NumberButton from '../../components/elements/NumberButton';
import BackgroundAbsolute from '../../components/elements/BackgroundAbsolute';
import {useNavigation} from '@react-navigation/core';
import {editChildProfile} from '../../api/accounts/childSettings';
import AsyncStorage from '@react-native-community/async-storage';
import AlertModal from '../../components/elements/AlertModal';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function ChildSetting() {
  const [modalVisible, setModalVisible] = useState(false);
  const [fmodalVisible, setfModalVisible] = useState(false);
  const navigation = useNavigation();

  // 돌아가는지 테스트 필요함
  const child = '10'; // 임시값
  const submitChangeInfo = () => {
    const formData = new FormData();
    formData.append('name', String(childNName)); // 임시
    formData.append('year', Number(childBirth)); // 임시
    formData.append('img', Number(dinoPicNum)); // 임시

    editChildProfile(
      child,
      formData,
      (res) => {
        if (res.status === 201) {
          changeModalState();
          setTimeout(() => {
            navigation.navigate('Main');
          }, 1500);
        } else {
        }
      },
      (err) => {
        console.log(err);
      },
    );
  };
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 1000);
  };
  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };
  const fcloseModal = () => {
    setTimeout(() => {
      setfModalVisible(!fmodalVisible);
    }, 1000);
  };
  const fchangeModalState = () => {
    setfModalVisible(!fmodalVisible);
  };
  let origin = '';
  // 캐릭터를 불러와 볼까요?
  // AsyncStorage.getItem('변수명몰라', (err, result) => {
  //   if ('변수명몰라' !== null) {
  //     origin = reuslt;
  //     console.log(result);
  //   } else {
  //     console.log(err);
  //   }
  // });
  // AsyncStorage.getAllKeys().then(console.log);

  const url = require('../../assets/images/background2.png');

  const [isChangeName, setIschangeName] = useState(false);
  const [isChangeBirth, setIschangeBirth] = useState(false);
  const [isChangePic, setIschangePic] = useState(false);
  const [childNName, setChildNName] = useState('');
  const [childBirth, setChildBirth] = useState('');
  const [dinoPicNum, setDinoPicNum] = useState(origin);

  let dinoArray = {
    1: require('../../assets/images/character1.png'),
    2: require('../../assets/images/character2.png'),
    3: require('../../assets/images/character3.png'),
    4: require('../../assets/images/character4.png'),
    5: require('../../assets/images/character5.png'),
  };

  let dinoPic = dinoArray[dinoPicNum];

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
                        placeholder={'채아'}
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
                      <TextInput
                        autoCompleteType={'off'}
                        style={styles.numInput}
                        // 수정해야함
                        placeholder={'2014'}
                        placeholderTextColor="#6e6e6e"
                        maxLength={4}
                        // whenever using software keyboard
                        keyboardType={'numeric'}
                        // showSoftInputOnFocus={false}
                        onFocus={() => [
                          setIschangeName(false),
                          setIschangeBirth(true),
                          setIschangePic(false),
                          // Keyboard.dismiss(),
                        ]}
                        value={childBirth}
                        onChangeText={(text) => setChildBirth(text)}
                      />
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
                    {/* <NumberButton /> */}
                    {isChangeName && <Text> </Text>}
                    {isChangeBirth && <NumberButton />}
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
  numInput: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: height * 0.04,
    color: '#FB537B',
    width: height * 0.2,
    height: height * 0.08,
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
});
