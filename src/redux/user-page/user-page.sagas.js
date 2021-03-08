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
import UserAPI from '../../apis/user.api';
import { selectUserPageId } from './user-page.selectors';
import { getHandledNetworkErrors } from '../user/user.sagas';
import { ERROR_CONFIG } from '../../config/errors';

function getHandledGetUserErrors(error) {
  const errors = getHandledNetworkErrors(error);

  if (!error.response) {
    return errors;
  }

  errors.pageNotFound = [];

  switch (error.response.status) {
    case 404:
      errors.pageNotFound.push(ERROR_CONFIG.GET_USER.PAGE_NOT_FOUND.text);
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
    console.log(errors);

    yield put(UserPageActions.getUserFailure(error.message));
  }
}

function* refreshPage() {
  const currentPageId = yield select(selectUserPageId);

  yield put(UserPageActions.getUserStart(currentPageId));
}

function* onGetUserStart() {
  yield takeLatest(UserPageActionTypes.GET_USER_START, getUser);
}

function* onRefreshPage() {
  yield takeEvery(UserPageActionTypes.REFRESH_PAGE, refreshPage);
}

export default function* userPageSagas() {
  yield all([call(onGetUserStart), call(onRefreshPage)]);
}
