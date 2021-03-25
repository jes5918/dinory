// Import React
import React, {useState} from 'react';
// Import required components
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ImageBackground,
  Dimensions,
} from 'react-native';

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Layout from '../../components/elements/Layout';

const bgurl = require('../../assets/images/background3.png');

const SelectImage = () => {
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
      quality: 1,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

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
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

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
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };
  const dimensions = Dimensions.get('window');
  const layoutWidth = dimensions.width * 0.6;
  const layoutHeight = dimensions.height * 0.5;

  return (
    <ImageBackground source={bgurl} style={styles.box}>
      <Layout width={700} height={500} opacity={1}>
        {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> */}
        {/* <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
        <Text style={styles.textStyle}>{filePath.uri}</Text> */}
        <View style={[styles.container]}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle1}
            onPress={() => captureImage('photo')}>
            <Image
              source={require('../../assets/images/egg.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                marginVertical: 10,
              }}></Image>
            <Text style={styles.textStyle}>사진 촬영</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle2}
            onPress={() => chooseFile('photo')}>
            <Image
              source={require('../../assets/images/egg.png')}
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                marginVertical: 10,
              }}></Image>
            <Text style={styles.textStyle}>사진 가져오기</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    </ImageBackground>
  );
};

export default SelectImage;

const tempDimensions = Dimensions.get('window');
const tempWidth = tempDimensions.width;
const tempHeight = tempDimensions.height;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    padding: 10,
    color: 'white',
    textAlign: 'center',
    fontSize: 36,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 10,
  },

  imageStyle: {
    width: 200,
    height: 200,
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
