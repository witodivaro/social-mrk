import { takeLatest, put, all, call, delay } from "redux-saga/effects";
import login from "../../apis/login";
import register from "../../apis/register";

import { ERROR_CONFIG } from "../../config/errors";

import {
  signInFailure,
  signInSuccess,
  signUpFailure,
  signUpSuccess,
} from "./user.actions";
import userActionTypes from "./user.types";

function* getHandledNetworkErrors(error) {
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
  }

  return errors;
}

function* getHandledSignUpErrors(error) {
  const errors = yield getHandledNetworkErrors(error);

  if (error.response && error.response.status === 400) {
    for (const errorName of Object.keys(error.response.data.error)) {
      let error = null;

      switch (errorName) {
        case "username":
          error = {
            type: ERROR_CONFIG.SIGN_UP.USERNAME_TAKEN.type,
          };
          break;

        case "email":
          error = {
            type: ERROR_CONFIG.SIGN_UP.EMAIL_TAKEN.type,
          };
          break;
      }

      yield errors.push(error);
    }
  }

  return errors;
}

function* getHandledSignInErrors(error) {
  const errors = yield getHandledNetworkErrors(error);

  if (error.response && error.response.status === 400) {
    for (const errorName of Object.keys(error.response.data.error)) {
      let error = null;

      switch (errorName) {
        case "credentials":
          error = {
            type: ERROR_CONFIG.SIGN_IN.WRONG_CREDENTIALS.type,
          };
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
    const errors = yield getHandledSignInErrors(error);

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
    const errors = yield getHandledSignUpErrors(error);

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
