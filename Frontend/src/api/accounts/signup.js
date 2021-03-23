import {createInstance} from '../index.js';

const instance = createInstance();

function confirmEmail(email, success, fail) {
  instance.post('accounts/check/email/', email).then(success).catch(fail);
}

function duflicationCheckID(username, success, fail) {
  instance.post('accounts/check/user/', username).then(success).catch(fail);
}

function signupInstance(userInfo, success, fail) {
  instance.post('accounts/signup/', userInfo).then(success).catch(fail);
}

export {confirmEmail, duflicationCheckID, signupInstance};
