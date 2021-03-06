import { takeLatest, put, all, call, takeEvery } from 'redux-saga/effects';
import signInAPI from '../../apis/sign-in';
import signUpAPI from '../../apis/sign-up';
import getUserAPI from '../../apis/get-user';

import { ERROR_CONFIG } from '../../config/errors';

import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  changeUserFailure,
  changeUserSuccess,
  getCurrentUserStart,
} from './user.actions';
import UserActionTypes from './user.types';
import changeUserAPI from '../../apis/change-user';
import { refreshPage } from '../user-page/user-page.actions';

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

function getHandledChangeUserErrors(error) {
  let errors = getHandledNetworkErrors(error);

  // TBD

  return errors;
}

function* signInStartSaga({ payload }) {
  try {
    const { username, password } = payload;
    const response = yield signInAPI({
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

function* signUpStartSaga({ payload }) {
  try {
    const { username, password, email } = yield payload;
    yield signUpAPI({
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

function* getCurrentUserSaga() {
  try {
    const response = yield getUserAPI(0);
    const currentUser = response.data.user;

    yield put(getCurrentUserSuccess(currentUser));
  } catch (error) {
    put(getCurrentUserFailure(error));
  }
}

function* changeUserSaga({ payload: userData }) {
  try {
    yield changeUserAPI({
      ...userData,
    });

    yield put(changeUserSuccess());
  } catch (error) {
    put(changeUserFailure(getHandledChangeUserErrors(error)));
  }
}

function* changeUserSuccessSaga() {
  yield put(getCurrentUserStart());
  yield put(refreshPage());
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpStartSaga);
}

function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInStartSaga);
}

function* onGetCurrentUserStart() {
  yield takeLatest(UserActionTypes.GET_CURRENT_USER_START, getCurrentUserSaga);
}

function* onChangeUserSuccess() {
  yield takeEvery(UserActionTypes.CHANGE_USER_SUCCESS, changeUserSuccessSaga);
}

function* onChangeUserStart() {
  yield takeLatest(UserActionTypes.CHANGE_USER_START, changeUserSaga);
}

export function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onSignInStart),
    call(onGetCurrentUserStart),
    call(onChangeUserStart),
    call(onChangeUserSuccess),
  ]);
}
