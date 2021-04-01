import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();
// 알파벳 별 단어 리스트 불러오기
function getListbyAlphabet(params, success, fail) {
  instance
    .get('word/', {
      params: {
        child: params && params.child,
        alphabet: params && params.alphabet,
      },
    })
    .then(success)
    .catch(fail);
}
// 단어별 정보 조회
function getWordDetail(params, success, fail) {
  instance
    .get('words/absolute/', {
      params: {
        child: params && params.child,
      },
    })
    .then(success)
    .catch(fail);
}

export {getListbyAlphabet, getWordDetail};
