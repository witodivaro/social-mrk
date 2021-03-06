import {
  all,
  call,
  takeEvery,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
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

function* refreshPage() {
  console.log('refresh page');
  const currentPageId = yield select(selectUserPageId);

  yield put(getUserStart(currentPageId));
}

function* onGetUserStart() {
  yield takeLatest(UserPageActionTypes.GET_USER_START, getUserPage);
}

function* onRefreshPage() {
  yield takeEvery(UserPageActionTypes.REFRESH_PAGE, refreshPage);
}

export function* userPageSagas() {
  yield all([call(onGetUserStart), call(onRefreshPage)]);
}
