import { takeLatest, put, all, call } from "redux-saga/effects";
import UserProfileAPI from "../../apis/user-profile/api";
import UserAPI from "../../apis/user/api";

import { ERROR_CONFIG } from "../../config/errors";

import * as UserActions from "./user.actions";
import UserActionTypes from "./user.types";

export function getHandledNetworkErrors(error) {
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
        case "username":
          errors.username.push(ERROR_CONFIG.SIGN_UP.USERNAME_TAKEN.text);
          break;

        case "email":
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
        case "credentials":
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

function* signIn({ payload }) {
  try {
    const { username, password } = payload;
    const response = yield UserAPI.signIn({
      username,
      password,
    });

    const token = yield response.data.token;

    yield put(UserActions.signInSuccess(token));
  } catch (error) {
    const errors = yield getHandledSignInErrors(error);

    yield put(UserActions.signInFailure(errors));
  }
}

function* signUp({ payload }) {
  try {
    const { username, password, email } = yield payload;
    yield UserAPI.signUp({
      username,
      password,
      email,
    });

    yield put(UserActions.signUpSuccess());
  } catch (error) {
    const errors = yield getHandledSignUpErrors(error);

    yield put(UserActions.signUpFailure(errors));
  }
}

function* getCurrentUser() {
  try {
    const response = yield UserProfileAPI.getUser(0);
    const currentUser = response.data.user;

    yield put(UserActions.getCurrentUserSuccess({ currentUser }));
  } catch (error) {
    yield put(UserActions.getCurrentUserFailure(error));
  }
}

function* changeUser({ payload: changedUserData }) {
  try {
    yield UserProfileAPI.changeUser({
      ...changedUserData,
    });

    yield put(UserActions.changeUserSuccess({ changedUserData }));
  } catch (error) {
    const handledErrors = getHandledChangeUserErrors(error);
    yield put(UserActions.changeUserFailure(handledErrors));
  }
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

function* onGetCurrentUserStart() {
  yield takeLatest(UserActionTypes.GET_CURRENT_USER_START, getCurrentUser);
}

function* onChangeUserStart() {
  yield takeLatest(UserActionTypes.CHANGE_USER_START, changeUser);
}

export default function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onSignInStart),
    call(onGetCurrentUserStart),
    call(onChangeUserStart),
  ]);
}
