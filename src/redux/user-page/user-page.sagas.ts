import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as UserPageActions from './user-page.actions';
import UserPageActionTypes from './user-page.types';
import { getHandledNetworkErrors } from '../user/user.sagas';
import UserProfileAPI from '../../apis/user-profile/api';
import type { Error } from '../../types/Error';
import { HandledGetUserErrors } from '../../types/HandledErrors';
import { AnyAction } from 'redux';
import { SignInStartAction } from '../../types/redux/user/SignInStart';

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

function* getUser({ payload: id }: SignInStartAction) {
  try {
    const { data } = yield UserProfileAPI.getUser(id);
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
