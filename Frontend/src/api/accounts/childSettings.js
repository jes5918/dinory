import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

function getChildProfile(success, fail) {
  instance.get(`accounts/child/`).then(success).catch(fail);
}

function createChildProfile(profileInfo, success, fail) {
  instance.post(`accounts/child/`, profileInfo).then(success).catch(fail);
}

// function editChildProfile(child_pk, profileInfo, success, fail) {
//   instance
//     .post(`child/setting/${child_pk}`, profileInfo)
//     .then(success)
//     .catch(fail);
// }

// function deleteChildProfile(child_pk, profileInfo, success, fail) {
//   instance
//     .delete(`child/setting/${child_pk}`, profileInfo)
//     .then(success)
//     .catch(fail);
// }

export {
  getChildProfile,
  createChildProfile,
  // editChildProfile,
  // editChildProfile,
};
