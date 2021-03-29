import {createInstance} from '../index.js';

const instance = createInstance();

function loginInstance(loginInfo, success, fail) {
  instance.post('accounts/login/', loginInfo).then(success).catch(fail);
}

function validateToken(token, success, fail) {
  instance.post('accounts/login/verify/', token).then(success).catch(fail);
}

function refreshToken(token, success, fail) {
  instance.post('/accounts/login/refresh/', token).then(success).catch(fail);
}
export {loginInstance, validateToken, refreshToken};
