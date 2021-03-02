import { takeLatest, put, all, call } from 'redux-saga/effects';
import login from '../../apis/login';
import signUp from '../../apis/sign-up';
import getUser from '../../apis/get-user';

import { ERROR_CONFIG } from '../../config/errors';

import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  getCurrentUserSuccess,
  getCurrentUserFailure,
} from './user.actions';
import UserActionTypes from './user.types';

function getHandledNetworkErrors(error) {
  const errors = {};

  errors.network = [];

  if (!error.response) {
    errors.network.push(ERROR_CONFIG.NETWORK.CLIENT_FAIL.text);
  } else if (error.response.status === 500) {
    errors.network.push(ERROR_CONFIG.NETWORK.SERVER_FAIL.text);
  }

  return errors;
}

function getHandledSignUpErrors(error) {
  const errors = getHandledNetworkErrors(error);

  Object.assign(errors, {
    username: [],
    email: [],
  });

  if (error.response && error.response.status === 400) {
    for (const errorName of Object.keys(error.response.data.error)) {
      switch (errorName) {
        case 'username':
          errors.username.push(ERROR_CONFIG.SIGN_UP.USERNAME_TAKEN.text);
          break;

        case 'email':
          errors.email.push(ERROR_CONFIG.SIGN_UP.EMAIL_TAKEN.text);
          break;
      }
    }
  }

  return errors;
}

function getHandledSignInErrors(error) {
  let errors = getHandledNetworkErrors(error);

  Object.assign(errors, {
    credentials: [],
  });

  if (error.response && error.response.status === 400) {
    for (const errorName of Object.keys(error.response.data.error)) {
      switch (errorName) {
        case 'credentials':
          errors.credentials.push(ERROR_CONFIG.SIGN_IN.WRONG_CREDENTIALS.text);
      }
    }
  }

  return errors;
}

function* signInStart({ payload }) {
  try {
    const { username, password } = yield payload;
    const response = yield login({
      username,
      password,
    });

    const token = yield response.data.token;

    yield put(signInSuccess(token));
  } catch (error) {
    const errors = yield getHandledSignInErrors(error);

    yield put(signInFailure(errors));
  }
}

function* signUpStart({ payload }) {
  try {
    const { username, password, email } = yield payload;
    yield signUp({
      username,
      password,
      email,
    });

    yield put(signUpSuccess());
  } catch (error) {
    const errors = yield getHandledSignUpErrors(error);

    yield put(signUpFailure(errors));
  }
}

function* getCurrentUser({ payload: token }) {
  try {
    const response = yield getUser(token, 0);
    const currentUser = response.data.user;

    yield put(getCurrentUserSuccess(currentUser));
  } catch (error) {
    put(getCurrentUserFailure(error));
  }
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpStart);
}

function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInStart);
}

function* onGetCurrentUserStart() {
  yield takeLatest(UserActionTypes.GET_CURRENT_USER_START, getCurrentUser);
}

export function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onSignInStart),
    call(onGetCurrentUserStart),
  ]);
}
