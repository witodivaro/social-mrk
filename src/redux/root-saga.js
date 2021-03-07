import { all, call } from 'redux-saga/effects';

import userSagas from './user/user.sagas';
import userPageSagas from './user-page/user-page.sagas';
import userInteractionsSagas from './user-interactions/user-interactions.sagas';

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(userPageSagas),
    call(userInteractionsSagas),
  ]);
}
