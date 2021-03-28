import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

export function getListbyAlphabet(child, alphabet, success, fail) {
  instance.get('words/', {params: {child, alphabet}}).then(success).catch(fail);
}
export function getList(child, word, success, fail) {
  instance.get('words/', {params: {word, child}}).then(success).catch(fail);
}
