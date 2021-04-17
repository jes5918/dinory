import {AuthorizationInstance} from '../index.js';

const instance = AuthorizationInstance();

function didTutorial(child, success, fail) {
  instance.get(`notes/tutorial/?child=${child}`).then(success).catch(fail);
}

export {didTutorial};
