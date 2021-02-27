import { takeLatest, put, all, call } from 'redux-saga/effects';
import login from '../../apis/login';
import register from '../../apis/register';

import { ERROR_CONFIG } from '../../config/errors';

import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
} from './user.actions';
import userActionTypes from './user.types';

function* getHandledAuthErrors(error) {
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
  } else if (error.response.status === 400) {
    console.log(error.response.data);
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
        case 'credentials':
          error = {
            type: ERROR_CONFIG.LOGIN.wrongCredentials.type,
            text: ERROR_CONFIG.LOGIN.wrongCredentials.text,
          };
          break;
      }

      yield errors.push(error);
    }
  }

  return errors;
}

function* signIn({ payload }) {
  try {
    const { username, password } = yield payload;
    const response = yield login({
      username,
      password,
    });

    const token = yield response.data.token;

    yield put(signInSuccess(token));
  } catch (error) {
    const errors = yield getHandledAuthErrors(error);

    yield put(signInFailure(errors));
  }
}

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
    const errors = yield getHandledAuthErrors(error);

    yield put(signUpFailure(errors));
  }
}

function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

function* onSignInStart() {
  yield takeLatest(userActionTypes.SIGN_IN_START, signIn);
}

export function* userSagas() {
  yield all([call(onSignUpStart), call(onSignInStart)]);
}
