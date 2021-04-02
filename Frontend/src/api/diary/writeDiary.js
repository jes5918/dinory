import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

function createDiary(diary, child, success, fail) {
  instance.post(`notes/diary/?child=${child}`, diary).then(success).catch(fail);
}

function imageCaptioning(image, success, fail) {
  instance.post(`ai/imagecaption/`, image).then(success).catch(fail);
}

function pronunCheck(speakfile, success, fail) {
  instance.post(`ai/pronunciation/`, speakfile).then(success).catch(fail);
}

function saveWords(words, child, success, fail) {
  instance.post(`words/?child=${child}`, words).then(success).catch(fail);
}

function grammarCheck(text, success, fail) {
  instance.post(`ai/grammarcheck2/`, text).then(success).catch(fail);
}

export {createDiary, imageCaptioning, grammarCheck, pronunCheck, saveWords};
