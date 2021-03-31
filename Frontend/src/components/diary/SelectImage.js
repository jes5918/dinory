import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Layout from '../../components/elements/Layout';

const bgurl = require('../../assets/images/background3.png');

const SelectImage = ({setSelectImage}) => {
  const [filePath, setFilePath] = useState({});
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: '앱 카메라 접근 권한',
            message: '카메라 접근 권한이 필요해요!',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: '앱 갤러리 접근 권한',
            message: '갤러리 접근 권한이 필요해요!',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      quality: 0.2,
      saveToPhotos: true,
      // includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          alert('사진 찍기 취소!');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      quality: 0.2,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        alert('사진 올리기 취소!');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setSelectImage(response);
    });
  };

  const dimensions = Dimensions.get('window');
  const layoutWidth = dimensions.width * 0.6;
  const layoutHeight = dimensions.height * 0.5;

  return (
    <Layout width={700} height={500} opacity={0.9} styleProps={{zIndex: 10}}>
      <View style={[styles.container]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle1}
          onPress={() => captureImage('photo')}>
          <Image
            source={require('../../assets/images/character5.png')}
            style={{
              width: layoutWidth * 0.2,
              height: layoutWidth * 0.2,
              resizeMode: 'contain',
              marginVertical: 10,
            }}></Image>
          <Text style={styles.textStyle}>사진 촬영</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle2}
          onPress={() => chooseFile('photo')}>
          <Image
            source={require('../../assets/images/character1.png')}
            style={{
              width: layoutWidth * 0.2,
              height: layoutWidth * 0.2,
              resizeMode: 'contain',
              marginVertical: 10,
            }}></Image>
          <Text style={styles.textStyle}>사진 가져오기</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default SelectImage;

const tempDimensions = Dimensions.get('window');
const tempWidth = tempDimensions.width;
const tempHeight = tempDimensions.height;

const styles = StyleSheet.create({
  textStyle: {
    padding: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: tempWidth * 0.028,
    fontFamily: 'HoonPinkpungchaR',
  },
  buttonStyle1: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#f0859f',
    marginVertical: 10,
    width: '40%',
    height: '90%',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
  },
  buttonStyle2: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#76b0e9',
    marginVertical: 10,
    width: '40%',
    height: '90%',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    elevation: 7,
  },

  imageStyle: {
    width: 400,
    height: 400,
    margin: 5,
  },
  container: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
