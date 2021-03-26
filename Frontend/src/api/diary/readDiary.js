import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

export function getNotesByMonth(child, success, fail) {
  instance
    .get('notes/', {params: {child, year, month}})
    .then(success)
    .catch(fail);
}

export function getNotesByYear(child, success, fail) {
  instance.get('notes/', {params: {child}}).then(success).catch(fail);
}

// date 구하기
// ==========================
const date = new Date();
const textMonth = String(date.getMonth() + 1);

const makeMonth = (text) => {
  let newText = '';
  if (text.length === 1) {
    newText = '0' + text;
  } else {
    newText = text;
  }
  return newText;
};

const year = String(date.getFullYear());
const month = makeMonth(textMonth);
// ==========================
