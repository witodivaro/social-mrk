import * as UserInteractionsActions from './user-interactions.actions';
import UserAPI from '../../apis/user.api';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import UserInteractionsActionTypes from './user-interactions.types';
import { getHandledNetworkErrors } from '../user/user.sagas';

function* manageFriends({ payload }) {
  try {
    const {
      id,
      acceptRequest,
      rejectRequest,
      addFriend,
      removeFriend,
    } = yield payload;

    yield UserAPI.manageFriends({
      id,
      acceptRequest,
      rejectRequest,
      addFriend,
      removeFriend,
    });

    yield put(
      UserInteractionsActions.manageFriendsSuccess({
        id,
        addFriend,
        acceptRequest,
        rejectRequest,
        removeFriend,
      })
    );
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(UserInteractionsActions.manageFriendsFailure(handledErrors));
  }
}

function* onManageFriendsStart() {
  yield takeLatest(
    UserInteractionsActionTypes.MANAGE_FRIENDS_START,
    manageFriends
  );
}

export default function* userInteractionsSagas() {
  yield all([call(onManageFriendsStart)]);
}
