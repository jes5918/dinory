import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// API_KEY 받아오고
const API_BASE_URL = 'https://j4b105.p.ssafy.io/api/';

// 'jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJzdWVtaW4xIiwiZXhwIjoxNjE3NzcwMjQyLCJlbWFpbCI6InBvcG9wMDkwOTBAbmF2ZXIuY29tIn0.NjNEuTXianJ1lQ2SzsyxV6uZgELGTM1236DVw76MtE4';

const getToken = async () => {
  let tempToken = '';
  try {
    await AsyncStorage.getItem('jwt').then((jwt) => {
      tempToken = jwt;
    });
    if (tempToken) {
      return tempToken;
    }
  } catch (e) {
    console.error(e);
  }
};

function createInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });
  return instance;
}

function AuthorizationInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  instance.interceptors.request.use(
    async function (config) {
      const accToken = await getToken();
      const token = 'jwt ' + accToken;

      config.headers = {
        Authorization: token,
      };
      return config;
    },
    function (error) {
      // 오류 요청을 보내기전 수행할 일
      // ...
      return Promise.reject(error);
    },
  );

  return instance;
}

export {createInstance, AuthorizationInstance};
