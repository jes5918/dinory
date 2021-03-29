import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

// 아이 조회
function getChildProfile(success, fail) {
  instance.get(`accounts/child/`).then(success).catch(fail);
}

// 아이 생성
function createChildProfile(profileInfo, success, fail) {
  instance.post(`accounts/child/`, profileInfo).then(success).catch(fail);
}

// 아이 정보 수정
function editChildProfile(child, profileInfo, success, fail) {
  let path = `accounts/child/setting/?child=${child.child}`;
  console.log(path);
  instance
    .put(path, profileInfo)
    // .put(`accounts/child/setting/?child=${child}`, profileInfo)
    .then(success)
    .catch(fail);
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
  // editChildProfile,
};
