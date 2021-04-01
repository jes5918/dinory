import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

export default function getNotesByDay(params, success, fail) {
  instance
    .get('notes/diary/total/daily/', {
      params: {
        child: (params && params.child) || child,
        year: (params && params.year) || year,
        month: (params && params.month) || month,
        date: (params && params.date) || date,
      },
    })
    .then(success)
    .catch(fail);
}

// date 구하기
// ==========================
const today = new Date();
const textMonth = String(today.getMonth() + 1);

const makeMonth = (text) => {
  let newText = '';
  if (text.length === 1) {
    newText = '0' + text;
  } else {
    newText = text;
  }
  return newText;
};

const child = 10; // 임시
const year = String(today.getFullYear());
const month = makeMonth(textMonth);
const date = String(today.getDay());
// ==========================
