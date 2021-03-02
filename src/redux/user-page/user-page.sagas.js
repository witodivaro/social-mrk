import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getUserFailure, getUserSuccess } from './user-page.actions';
import UserPageActionTypes from './user-page.types';
import getUser from '../../apis/get-user';

function* getUserPage({ payload }) {
  try {
    const { data } = yield getUser(payload.token, payload.id);
    const { user } = data;

    yield put(getUserSuccess(user));
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}

function* onGetUserStart() {
  yield takeLatest(UserPageActionTypes.GET_USER_START, getUserPage);
}

export function* userPageSagas() {
  yield all([call(onGetUserStart)]);
}
