import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();
function getChildProfile(success, fail) {
  instance.get(`accounts/child/`).then(success).catch(fail);
}

// 아이 생성
function createChildProfile(profileInfo, success, fail) {
  instance.post(`accounts/child/`, profileInfo).then(success).catch(fail);
}

// 아이 정보 수정
function editChildProfile(child, profileInfo, success, fail) {
  let path = `accounts/child/setting/?child=${child}`;
  instance.put(path, profileInfo).then(success).catch(fail);
}

// 아이 목소리 수정
function editChildVoice(child, voice, success, fail) {
  let path = `accounts/child/setting/voice/?child=${child}`;
  instance.put(path, voice).then(success).catch(fail);
}

// function deleteChildProfile(child_pk, profileInfo, success, fail) {
//   instance
//     .delete(`child/setting/${child_pk}`, profileInfo)
//     .then(success)
//     .catch(fail);
// }

export {
  getChildProfile,
  createChildProfile,
  editChildProfile,
  editChildVoice,
  // editChildProfile,
};
