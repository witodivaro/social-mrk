import { all, call, put, takeLatest } from "redux-saga/effects";
import * as UserPageActions from "./user-page.actions";
import UserPageActionTypes from "./user-page.types";
import { getHandledNetworkErrors } from "../user/user.sagas";
import UserProfileAPI from "../../apis/user-profile/api";

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
