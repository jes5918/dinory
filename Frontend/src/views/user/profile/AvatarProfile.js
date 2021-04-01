// basic
import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Image} from 'react-native';

// axios
import {createChildProfile} from '../../../api/accounts/childSettings';

// 컴포넌트
import Layout from '../../../components/elements/Layout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ContentTitle from '../../../components/elements/ContentTitle';
import ArrowProfileButton from '../../../components/authorization/ArrowProfileButton';
import ArrowButton from '../../../components/elements/ArrowButton';
import DinoButton from '../../../components/elements/DinoButton';
import AlertModal from '../../../components/elements/AlertModal';

// 화면세팅
const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function AvatarProfile({navigation, route}) {
  const imageSrc = require('../../../assets/images/background2.png');
  const [imgNumber, setImgNumber] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [fmodalVisible, setfModalVisible] = useState(false);

  // 프로필 사진 고르기
  const selectNumber = (num) => {
    setImgNumber(num);
  };

  const CreateProfile = () => {
    console.log(imgNumber);
    if (imgNumber !== -1) {
      let ProfileInfo = new FormData();
      ProfileInfo.append('name', route.params.ProfileName);
      ProfileInfo.append('year', route.params.ProfileYear);
      ProfileInfo.append('img', imgNumber);
      createChildProfile(
        ProfileInfo,
        (res) => {
          console.log(res.data);
          changeModalState();
          setTimeout(() => {
            navigation.navigate('SelectProfile');
          }, 1500);
        },
        (error) => {
          console.log(error);
          alert('axios 에러남 확인해주세요.');
        },
      );
    } else {
      fchangeModalState();
    }
  };

  // 프로필 생성 성공 모달
  const closeModal = () => {
    setTimeout(() => {
      setModalVisible(!modalVisible);
    }, 1500);
  };

  const changeModalState = () => {
    setModalVisible(!modalVisible);
  };

  // 프로필 아바타 안선택했을 때 모달
  const fcloseModal = () => {
    setTimeout(() => {
      setfModalVisible(!fmodalVisible);
    }, 2000);
  };

  const fchangeModalState = () => {
    setfModalVisible(!fmodalVisible);
  };

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
          <ContentTitle title={'아바타를 선택하세요'} />
        </View>
        <View>
          <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
            <View style={styles.body}>
              <View style={styles.selectDino}>
                <DinoButton
                  imgSrc={require('../../../assets/images/character1.png')}
                  widthProps={width * 0.08}
                  onHandlePress={() => selectNumber(1)}
                />
                <DinoButton
                  imgSrc={require('../../../assets/images/character2.png')}
                  widthProps={width * 0.08}
                  onHandlePress={() => selectNumber(2)}
                />
                <DinoButton
                  imgSrc={require('../../../assets/images/character3.png')}
                  widthProps={width * 0.08}
                  onHandlePress={() => selectNumber(3)}
                />
                <DinoButton
                  imgSrc={require('../../../assets/images/character4.png')}
                  widthProps={width * 0.08}
                  onHandlePress={() => selectNumber(4)}
                />
                <DinoButton
                  imgSrc={require('../../../assets/images/character5.png')}
                  widthProps={width * 0.08}
                  onHandlePress={() => selectNumber(5)}
                />
              </View>
            </View>
            <View style={styles.marginBottom}>
              <ArrowProfileButton
                onHandlePress={() => {
                  CreateProfile();
                }}
              />
            </View>
            <AlertModal
              modalVisible={modalVisible}
              onHandleCloseModal={() => changeModalState()}
              text={'프로필이 생성되었습니다'}
              iconName={'smileo'}
              color={'#A0A0FF'}
              setTimeFunction={() => closeModal()}
            />
            <AlertModal
              modalVisible={fmodalVisible}
              onHandleCloseModal={() => fchangeModalState()}
              text={'프로필을 선택해주세요!'}
              iconName={'frowno'}
              color={'#FF0000'}
              setTimeFunction={() => fcloseModal()}
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
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  end: {
    flex: 1,
  },
  marginBottom: {
    marginBottom: 50,
  },
  selectDino: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
