import {createInstance} from '../index.js';

const instance = createInstance();
//이메일 중복확인
function confirmEmail(email, success, fail) {
  instance.post('accounts/check/email/', email).then(success).catch(fail);
}

// 이메일  인증 확인
function TransmitCodeToEmail(email, success, fail) {
  instance.post('accounts/send/email/', email).then(success).catch(fail);
}

// 이메일 인증 번호 확인
function confirmEmailCode(data, success, fail) {
  instance.post('accounts/send/email/confirm/', data).then(success).catch(fail);
}

//ID 중복체크
function duflicationCheckID(username, success, fail) {
  instance.post('accounts/check/user/', username).then(success).catch(fail);
}

function signupInstance(userInfo, success, fail) {
  instance.post('accounts/signup/', userInfo).then(success).catch(fail);
}

export {
  confirmEmail,
  duflicationCheckID,
  confirmEmailCode,
  TransmitCodeToEmail,
  signupInstance,
};
