import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

function createDiary(diary, child_id, success, fail) {
  instance
    .post(`notes/diary/?child=${child_id}`, diary)
    .then(success)
    .catch(fail);
}

export {createDiary};
