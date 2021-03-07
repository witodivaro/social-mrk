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

function* getUser({ payload: id }) {
  try {
    const { data } = yield UserAPI.getUser(id);
    const { user } = data;

    yield put(UserPageActions.getUserSuccess(user));
  } catch (error) {
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

export function* userPageSagas() {
  yield all([call(onGetUserStart), call(onRefreshPage)]);
}
