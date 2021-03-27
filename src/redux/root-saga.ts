import { all, call } from 'redux-saga/effects';

import userSagas from './user/user.sagas';
import userPageSagas from './user-page/user-page.sagas';
import socialsSagas from './socials/socials.sagas';
import messagesSagas from './messages/messages.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(userPageSagas),
    call(socialsSagas),
    call(messagesSagas),
  ]);
}
