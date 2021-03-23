import axios from 'axios';
// API_KEY 받아오고
const API_BASE_URL = `http://j4b105.p.ssafy.io/`;

function createInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });
  return instance;
}

function AuthorizationInstance() {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    header: {
      Authorization: '',
    },
  });
  return instance;
}

export {createInstance, AuthorizationInstance};
