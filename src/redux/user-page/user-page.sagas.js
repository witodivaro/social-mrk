import {
  all,
  call,
  takeEvery,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import * as UserPageActions from './user-page.actions';
import UserPageActionTypes from './user-page.types';
import * as UserActions from '../user/user.actions';
import UserAPI from '../../apis/user.api';
import { getHandledNetworkErrors } from '../user/user.sagas';

function getHandledGetUserErrors(error) {
  const errors = getHandledNetworkErrors(error);

  if (!error.response) {
    return errors;
  }

  errors.isPageNotFound = false;

  switch (error.response.status) {
    case 404:
      errors.isPageNotFound = true;
      break;
  }

  return errors;
}

function* getUser({ payload: id }) {
  try {
    const { data } = yield UserAPI.getUser(id);
    const { user } = data;

    yield put(UserPageActions.getUserSuccess(user));
  } catch (error) {
    const errors = getHandledGetUserErrors(error);

    yield put(UserPageActions.getUserFailure(errors));
  }
}

function* refreshCurrentUserPage() {
  yield put(UserActions.getCurrentUserStart());
}

function* onGetUserStart() {
  yield takeLatest(UserPageActionTypes.GET_USER_START, getUser);
}

function* onRefreshCurrentUserPage() {
  yield takeEvery(
    UserPageActionTypes.REFRESH_CURRENT_USER_PAGE,
    refreshCurrentUserPage
  );
}

export default function* userPageSagas() {
  yield all([call(onGetUserStart), call(onRefreshCurrentUserPage)]);
}
