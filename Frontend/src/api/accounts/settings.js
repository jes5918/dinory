import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

function changePassword(user_pk, passwordInfo, success, fail) {
  instance
    .put(`accounts/setting/password/${user_pk}/`, passwordInfo)
    .then(success)
    .catch(fail);
}

function changePincode(user_pk, pinInfo, success, fail) {
  instance
    .put(`accounts/setting/pincode/${user_pk}/`, pinInfo)
    .then(success)
    .catch(fail);
}

export {changePassword, changePincode};
