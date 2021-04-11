import { AxiosPromise, AxiosResponse } from 'axios';
import { AnyAction } from 'redux';
import { takeLatest, put, all, call, StrictEffect } from 'redux-saga/effects';
import socialMrkAPI from '../../apis/social-mrk.api';
import { ERROR_CONFIG } from '../../config/errors';
import { Error } from '../../types/Error';
import {
  HandledChangeUserErrors,
  HandledNetworkError,
  HandledSignInErrors,
  HandledSignUpErrors,
} from '../../types/HandledErrors';
import { ChangeUserStartAction } from '../../types/redux/user/ChangeUserStart';
import { SignInStartAction } from '../../types/redux/user/SignInStart';
import { SignUpStartAction } from '../../types/redux/user/SignUpStart';
import { User } from '../../types/redux/user/User';
import * as UserActions from './user.actions';
import { UserActionTypes } from './user.types';
import imageCompression from 'browser-image-compression';

export function getHandledNetworkErrors(error: Error): HandledNetworkError {
  const errors: HandledNetworkError = {
    network: [],
  };

  if (!error.response) {
    errors.network.push(ERROR_CONFIG.NETWORK.CLIENT_FAIL.text);
  } else if (error.response.status === 500) {
    errors.network.push(ERROR_CONFIG.NETWORK.SERVER_FAIL.text);
  }

  return errors;
}

function getHandledSignUpErrors(error: Error): HandledSignUpErrors {
  const handledNetworkErrors = getHandledNetworkErrors(error);
  const handledSignUpErrors: HandledSignUpErrors = Object.assign(
    {},
    handledNetworkErrors,
    {
      username: [],
      email: [],
    }
  );

  if (error.response && error.response.status === 400) {
    for (const errorName of Object.keys(error.response.data.error)) {
      switch (errorName) {
        case 'username':
          handledSignUpErrors.username.push(
            ERROR_CONFIG.SIGN_UP.USERNAME_TAKEN.text
          );
          break;

        case 'email':
          handledSignUpErrors.email.push(ERROR_CONFIG.SIGN_UP.EMAIL_TAKEN.text);
          break;
      }
    }
  }

  return handledSignUpErrors;
}

function getHandledSignInErrors(error: Error): HandledSignInErrors {
  const handledNetworkErrors = getHandledNetworkErrors(error);
  const handledSignInErrors: HandledSignInErrors = Object.assign(
    {},
    handledNetworkErrors,
    {
      credentials: [],
    }
  );

  if (error.response && error.response.status === 400) {
    for (const errorName of Object.keys(error.response.data.error)) {
      switch (errorName) {
        case 'credentials':
          handledSignInErrors.credentials.push(
            ERROR_CONFIG.SIGN_IN.WRONG_CREDENTIALS.text
          );
      }
    }
  }

  return handledSignInErrors;
}

function getHandledChangeUserErrors(error: Error): HandledChangeUserErrors {
  const handledNetworkErrors = getHandledNetworkErrors(error);
  const handledChangeUserErrors: HandledChangeUserErrors = Object.assign(
    {},
    handledNetworkErrors,
    {
      credentials: [],
    }
  );

  // TBD

  return handledChangeUserErrors;
}

function* signIn({
  payload,
}: SignInStartAction): Generator<
  AxiosPromise | StrictEffect | HandledSignInErrors,
  void,
  AxiosResponse<{ access: string; refresh: string }>
> {
  try {
    const { username, password } = payload;
    const response = yield socialMrkAPI.signIn({
      username,
      password,
    });

    const token = response.data.access;

    yield put(UserActions.signInSuccess(token));
  } catch (error) {
    const handledSignInErrors = yield getHandledSignInErrors(
      error
    ) as HandledSignInErrors;

    // @ts-ignore
    yield put(UserActions.signInFailure(handledSignInErrors));
  }
}

function* signUp({
  payload,
}: SignUpStartAction): Generator<
  AxiosPromise | StrictEffect | HandledSignUpErrors,
  void,
  HandledSignUpErrors
> {
  try {
    const { username, password, email } = payload;
    yield socialMrkAPI.signUp({
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

function* getCurrentUser(): Generator<
  AxiosPromise | StrictEffect,
  void,
  AxiosResponse<User>
> {
  try {
    const response = yield socialMrkAPI.getCurrentUser();
    const currentUser = response.data;

    yield put(UserActions.getCurrentUserSuccess({ currentUser }));
  } catch (error) {
    yield put(UserActions.getCurrentUserFailure(error));
  }
}

function* changeUser({
  payload,
}: ChangeUserStartAction): Generator<
  AxiosPromise | StrictEffect,
  void,
  HandledChangeUserErrors
> {
  try {
    const changedUserData = payload;

    yield socialMrkAPI.changeUser({
      ...changedUserData,
    });

    yield put(UserActions.changeUserSuccess({ changedUserData }));
  } catch (error) {
    const handledErrors = getHandledChangeUserErrors(error);
    yield put(UserActions.changeUserFailure(handledErrors));
  }
}

function* compressAndChangeUserAvatar(
  action: AnyAction
): Generator<any, void, any> {
  const { imageFile } = action.payload;

  const COMPRESS_OPTIONS = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  };

  try {
    const compressedFile = yield imageCompression(imageFile, COMPRESS_OPTIONS);
    const reader = new FileReader();

    const image = yield new Promise((resolve) => {
      reader.onload = () => resolve(reader.result);

      reader.readAsDataURL(compressedFile);
    });

    yield put(
      UserActions.changeUserStart({
        image,
      })
    );
  } catch (e) {
    console.log('Error occurred on image compress.', e);
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

function* onCompressAndChangeUserAvatar() {
  yield takeLatest(
    UserActionTypes.COMPRESS_AND_CHANGE_USER_AVATAR,
    compressAndChangeUserAvatar
  );
}

export default function* userSagas() {
  yield all([
    call(onSignUpStart),
    call(onSignInStart),
    call(onGetCurrentUserStart),
    call(onChangeUserStart),
    call(onCompressAndChangeUserAvatar),
  ]);
}
