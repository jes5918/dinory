import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
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
    if (childBirth >= 1990 && childBirth <= 2020) {
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
          <View style={styles.innerContext}>
            {isChangeBirth && (
              <DialButton // 민호체크
                size={width * 0.06}
                verMargin={height * 0.02}
                horMargin={width * 0.01}
                deleteSize={width * 0.04}
                inputFunc={dialFunction}
              />
            )}
          </View>
          <View style={styles.bottomWrapper}>
            <View style={styles.inLine}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => [setIschangeBirth(true)]}>
                <View
                  style={styles.birthContainer}
                  onPress={() => [setIschangeBirth(true)]}>
                  <Text style={styles.birthText}>{childBirth}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <RoundButton
              arrow={true}
              onHandlePress={() => {
                next();
              }}
            />
          </View>
          <AlertModal
            modalVisible={bmodalVisible}
            onHandleCloseModal={() => bchangeModalState()}
            text={'태어난 년도를 다시 확인해볼까요?'}
            iconName={'frowno'}
            color={'#FF0000'}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  birthContainer: {
    width: width * 0.18,
    height: height * 0.1,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 7,
    justifyContent: 'center',
  },
  birthText: {
    textAlign: 'center',
    fontSize: height * 0.04,
    fontFamily: 'HoonPinkpungchaR',
  },
  bottomWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});
