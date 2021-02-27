import { takeLatest, put, all, call } from 'redux-saga/effects';
import register from '../../apis/register';

import { ERROR_CONFIG } from '../../config/errors';

import { signUpFailure, signUpSuccess } from './user.actions';
import userActionTypes from './user.types';

function* signUp({ payload }) {
  try {
    const { username, password, email } = yield payload;
    yield register({
      username,
      password,
      email,
    });

    yield put(signUpSuccess());
  } catch (error) {
    const errors = [];

    if (!error.response) {
      yield errors.push({
        type: ERROR_CONFIG.NETWORK.CLIENT_FAIL.type,
        text: ERROR_CONFIG.NETWORK.CLIENT_FAIL.text,
      });
    } else if (error.response.status === 500) {
      yield errors.push({
        type: ERROR_CONFIG.NETWORK.SERVER_FAIL.type,
        text: ERROR_CONFIG.NETWORK.SERVER_FAIL.text,
      });
    } else {
      for (const errorName of Object.keys(error.response.data.error)) {
        let error = null;

        switch (errorName) {
          case 'username':
            error = {
              type: ERROR_CONFIG.REGISTER.usernameTaken.type,
              text: ERROR_CONFIG.REGISTER.usernameTaken.text,
            };
            break;

          case 'email':
            error = {
              type: ERROR_CONFIG.REGISTER.emailTaken.type,
              text: ERROR_CONFIG.REGISTER.emailTaken.text,
            };
            break;
        }

        yield errors.push(error);
      }
    }
    console.log(errors);
    yield put(signUpFailure(errors));
  }
}

function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
  yield all([call(onSignUpStart)]);
}
