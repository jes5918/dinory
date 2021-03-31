import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// API_KEY 받아오고
const API_BASE_URL = 'https://j4b105.p.ssafy.io/api/';

// 'jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNCwidXNlcm5hbWUiOiJzdWVtaW4xIiwiZXhwIjoxNjE3NzcwMjQyLCJlbWFpbCI6InBvcG9wMDkwOTBAbmF2ZXIuY29tIn0.NjNEuTXianJ1lQ2SzsyxV6uZgELGTM1236DVw76MtE4';

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
  AsyncStorage.getItem('jwt').then((value) => {
    let Token = '';
    Token = 'jwt ' + value;
    instance.defaults.headers.common['Authorization'] = Token;
    instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  });
  return instance;
}

export {createInstance, AuthorizationInstance};
