import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

export default function getNotes(child, success, fail) {
  instance
    // .get('notes/', {params: {child: child, year: year, month: month}})
    .get('notes/', {params: {child, year, month}})
    .then(success)
    .catch(fail);
}

// date 구하기
// ==========================
const date = new Date();
const textMonth = String(date.getMonth() + 1);
console.log('month : ', textMonth);
console.log(date);

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
