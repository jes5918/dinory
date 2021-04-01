import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

function changePassword(passwordInfo, success, fail) {
  instance
    .put('accounts/setting/password/', passwordInfo)
    .then(success)
    .catch(fail);
}

function changePincode(pinInfo, success, fail) {
  instance.put('accounts/setting/pincode/', pinInfo).then(success).catch(fail);
}

function checkPincode(pinInfo, success, fail) {
  instance.post('accounts/check/pin/', pinInfo).then(success).catch(fail);
}

export {changePassword, changePincode, checkPincode};
