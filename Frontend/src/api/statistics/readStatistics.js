import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

export function getWordFrequency(child, success, fail) {
  instance
    .get('stats/words/', {
      params: {child},
    })
    .then(success)
    .catch(fail);
}

export function getWordCloudImage(child, success, fail) {
  instance
    .get('stats/words/cloud/', {
      params: {child},
    })
    .then(success)
    .catch(fail);
}

export function getDiaryStats(params, success, fail) {
  instance
    .get('stats/diary/', {
      params: {...params}, // child, year, month
    })
    .then(success)
    .catch(fail);
}

export function getCommitCount(params, success, fail) {
  instance
    .get('stats/diary/commit/', {
      params: {...params}, // child, year
    })
    .then(success)
    .catch(fail);
}
