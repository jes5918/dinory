import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Layout from '../../../components/elements/Layout';
import BackgroundAbsolute from '../../../components/elements/BackgroundAbsolute';
import ContentTitle from '../../../components/elements/ContentTitle';
import RoundButton from '../../../components/elements/RoundButton';
import DialButton from '../../../components/elements/DialButton';
import Header from '../../../components/elements/Header';
import AlertModal from '../../../components/elements/AlertModal';

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

export default function AgeProfile({navigation, route}) {
  const imageSrc = require('../../../assets/images/background2.png');
  const [childBirth, setChildBirth] = useState('');
  const [bmodalVisible, setbModalVisible] = useState(false);
  const [isChangeBirth, setIschangeBirth] = useState(false);

  const dialFunction = (data) => {
    if (childBirth.length <= 5) {
      if (data !== '지우개') {
        if (childBirth.length <= 3) {
          setChildBirth(childBirth.concat(data));
        } else {
          bchangeModalState();
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

  const bchangeModalState = () => {
    setbModalVisible(!bmodalVisible);
  };

  const bcloseModal = () => {
    setTimeout(() => {
      setbModalVisible(!bmodalVisible);
    }, 2000);
  };

  const next = () => {
    const date = new Date();
    const thisYear = date.getFullYear();
    if (childBirth >= (thisYear-100) && childBirth <= thisYear) {
      navigation.navigate('AvatarProfile', {
        ...route.params,
        ProfileYear: childBirth,
      });
    } else {
      bchangeModalState();
    }
  };
  return (
    <BackgroundAbsolute imageSrc={imageSrc}>
      <Header logoHeader={true} />
      <View style={styles.body}>
        <ContentTitle title={'태어난 연도를 선택해주세요'} />
        <Layout width={width * 0.8} height={height * 0.6} opacity={0.8}>
          <View style={styles.colContainer}>
            {isChangeBirth && (
              <View style={styles.rowContainer}>
                <DialButton
                  size={width * 0.055}
                  verMargin={height * 0.02}
                  horMargin={width * 0.005}
                  deleteSize={width * 0.04}
                  inputFunc={dialFunction}
                />
              </View>
            )}
            <View style={styles.rowContainer}>
              <View style={styles.inLine}>
                <Text style={styles.myInfo}>저는 </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => [setIschangeBirth(true)]}>
                  <View style={styles.birthContainer}>
                    {isChangeBirth && (
                      <Text style={styles.birthText}>{childBirth}</Text>
                    )}
                    {!isChangeBirth && (
                      <Text style={styles.beforeText}>눌러서 입력!</Text>
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.myInfo}> 년에</Text>
              </View>
              <View style={styles.inLine}>
                <Text style={styles.myInfo}>태어났어요! </Text>
                <RoundButton
                  arrow={true}
                  onHandlePress={() => {
                    next();
                  }}
                />
              </View>
              <Image
                source={require('../../../assets/images/babyDino.png')}
                style={styles.babyDino}
              />
            </View>
          </View>
          <AlertModal
            modalVisible={bmodalVisible}
            onHandleCloseModal={() => bchangeModalState()}
            text={'태어난 년도를 다시 확인해볼까요?'}
            iconName={'frowno'}
            color={'red'}
            setTimeFunction={() => bcloseModal()}
          />
        </Layout>
      </View>
    </BackgroundAbsolute>
  );
}
const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.14,
  },
  inLine: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: height * 0.01,
  },
  birthContainer: {
    width: width * 0.15,
    height: height * 0.1,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 7,
    justifyContent: 'center',
  },
  birthText: {
    textAlign: 'center',
    fontSize: height * 0.06,
    color: '#FB537B',
    fontFamily: 'HoonPinkpungchaR',
  },
  myInfo: {
    fontFamily: 'HoonPinkpungchaR',
    fontSize: height * 0.06,
    marginHorizontal: height * 0.015,
    textAlign: 'center',
  },
  colContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.35,
  },
  babyDino: {
    height: height * 0.3,
    resizeMode: 'contain',
  },
  beforeText: {
    textAlign: 'center',
    fontSize: height * 0.05,
    color: '#6e6e6e',
    fontFamily: 'HoonPinkpungchaR',
  },
});
