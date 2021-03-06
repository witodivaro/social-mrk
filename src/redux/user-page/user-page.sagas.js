import { all, call, take, put, select, takeLatest } from 'redux-saga/effects';
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
} from './user-page.actions';
import UserPageActionTypes from './user-page.types';
import getUser from '../../apis/get-user';
import { selectUserPageId } from './user-page.selectors';

function* getUserPage({ payload: id }) {
  try {
    const { data } = yield getUser(id);
    const { user } = data;

    yield put(getUserSuccess(user));
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}

function* onGetUserStart() {
  yield takeLatest(UserPageActionTypes.GET_USER_START, getUserPage);
}

function* onRefreshPage() {
  yield take(UserPageActionTypes.REFRESH_PAGE);
  const currentPageId = yield select(selectUserPageId);

  yield put(getUserStart(currentPageId));
}

export function* userPageSagas() {
  yield all([call(onGetUserStart), call(onRefreshPage)]);
}
