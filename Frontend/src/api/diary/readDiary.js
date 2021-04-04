import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

export function getNotesByYear(child, success, fail) {
  instance
    .get('notes/diary/total/', {
      params: {child},
    })
    .then(success)
    .catch(fail);
}

export function getNotesByMonth(params, success, fail) {
  instance
    .get('notes/diary/total/monthly/', {
      params: {
        child: Object.keys(params).length !== 0 && params.child,
        year: Object.keys(params).length !== 0 && (params.year || todayYear),
        month: Object.keys(params).length !== 0 && (params.month || todayMonth),
      },
    })
    .then(success)
    .catch(fail);
}

export function getNotesByDay(params, success, fail) {
  instance
    .get('notes/diary/total/daily/', {
      params: {
        child: Object.keys(params).length !== 0 && params.child,
        year: Object.keys(params).length !== 0 && params.year,
        month: Object.keys(params).length !== 0 && params.month,
        date: Object.keys(params).length !== 0 && params.date,
      },
    })
    .then(success)
    .catch(fail);
}

export function getNotesByOneDay(params, success, fail) {
  instance
    .get('notes/diary/monthly/', {
      params: {
        child: Object.keys(params).length !== 0 && params.child,
        year: Object.keys(params).length !== 0 && params.year,
        month: Object.keys(params).length !== 0 && params.month,
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

const todayMonth = makeMonth(textMonth);
const todayYear = today.getFullYear();
