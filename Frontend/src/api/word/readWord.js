import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();
// 알파벳 별 단어 리스트 불러오기
export function getListbyAlphabet(params, success, fail) {
  instance
    .get('words/', {
      params: {
        child: params.child,
        alphabet: params.alphabet,
      },
    })
    .then(success)
    .catch(fail);
}
// 단어별 정보 조회
export function getWordDetail(params, success, fail) {
  const url = 'words/' + params.word;
  instance
    .get(url, {
      params: {
        child: params.child,
      },
    })
    .then(success)
    .catch(fail);
}
