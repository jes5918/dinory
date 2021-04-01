import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();
// 알파벳 별 단어 리스트 불러오기
function getListbyAlphabet(params, success, fail) {
  console.log(params.alphabet);
  instance
    .get('words/', {
      params: {
        child: Object.keys(params).length !== 0 && params.child,
        alphabet: Object.keys(params).length !== 0 && params.alphabet,
      },
    })
    .then(success)
    .catch(fail);
}
// 단어별 정보 조회
function getWordDetail(params, success, fail) {
  instance
    .get(`words/${params.word}/`, {
      params: {
        child: Object.keys(params).length !== 0 && params.child,
      },
    })
    .then(success)
    .catch(fail);
}

export {getListbyAlphabet, getWordDetail};
