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

// 비밀번호 찾기 관련 API

// 비밀번호 찾기 - 이메일 인증코드 발송
// request data : { username : 유저아이디, email : 이메일 }
function sendEmailForPW(data, success, fail) {
  instance.post('accounts/find/password/', data).then(success).catch(fail);
}
// response data : { id: 번호표 } / 에러 응답

// 비밀번호 찾기 - 이메일 인증코드 확인 API
// request data : { email : 이메일, code : 인증코드, id : 번호표}
function confirmEmailForPW(data, success, fail) {
  instance
    .post('accounts/find/password/confirm/', data)
    .then(success)
    .catch(fail);
}
// response data : { user : 유저 id } / 에러 응답

// 비밀번호 찾기 - 새비밀번호 변경 API
// request data : { password : 비밀번호, password_confirmation : 비밀번호 확인}
// url 파라미터로 userpk
function changePWForLost(user, data, success, fail) {
  instance
    .put(`accounts/find/password/setting/${user}/`, data)
    .then(success)
    .catch(fail);
}
// response data : success / error 문구 응답
export {
  loginInstance,
  validateToken,
  refreshToken,
  sendEmailForPW,
  confirmEmailForPW,
  changePWForLost,
};
