import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as UserPageActions from './user-page.actions';
import UserPageActionTypes from './user-page.types';
import { getHandledNetworkErrors } from '../user/user.sagas';
import type { Error } from '../../types/Error';
import { HandledGetUserErrors } from '../../types/HandledErrors';
import { SignInStartAction } from '../../types/redux/user/SignInStart';
import socialMrkAPI from '../../apis/social-mrk.api';
import { GetUserStartAction } from '../../types/redux/user-page/GetUserStart';

function getHandledGetUserErrors(error: Error): HandledGetUserErrors {
  const handledNetworkErrors = getHandledNetworkErrors(error);
  const handledGetUserErrors = Object.assign({}, handledNetworkErrors, {
    isPageNotFound: false,
  });

  if (!error.response) {
    return handledGetUserErrors;
  }

  switch (error.response.status) {
    case 404:
      handledGetUserErrors.isPageNotFound = true;
      break;
  }

  return handledGetUserErrors;
}

function* getUser({ payload }: GetUserStartAction) {
  try {
    const { id } = payload;
    const { data } = yield socialMrkAPI.getUser(id);
    const { user } = data;

    yield put(UserPageActions.getUserSuccess(user));
  } catch (error) {
    const errors = getHandledGetUserErrors(error);

    yield put(UserPageActions.getUserFailure(errors));
  }
}

function* onGetUserStart() {
  yield takeLatest(UserPageActionTypes.GET_USER_START, getUser);
}

export default function* userPageSagas() {
  yield all([call(onGetUserStart)]);
}
