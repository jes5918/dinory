import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

function createDiary(diary, child_id, success, fail) {
  instance
    .post(`notes/diary/?child=${child_id}`, diary)
    .then(success)
    .catch(fail);
}

function imageCaptioning(image, success, fail) {
  instance.post(`ai/imagecaption/`, image).then(success).catch(fail);
}

function grammarCheck(sentence, success, fail) {
  instance.post(`ai/grammarcheck/`, sentence).then(success).catch(fail);
}

function pronunCheck(speakfile, success, fail) {
  instance.post(`ai/pronunciation/`, speakfile).then(success).catch(fail);
}

export {createDiary, imageCaptioning, grammarCheck, pronunCheck};
