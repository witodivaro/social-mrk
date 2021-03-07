import * as UserInteractionsActions from './user-interactions.actions';
import UserAPI from '../../apis/user.api';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import UserInteractionsActionTypes from './user-interactions.types';
import { getHandledNetworkErrors } from '../user/user.sagas';

function* addToFriends({ payload: id }) {
  try {
    console.log('SAGA STARTED');
    const response = yield UserAPI.addToFriends(id);
    console.log(response);

    yield put(UserInteractionsActions.addToFriendsSuccess());
  } catch (error) {
    console.log(error);
    const handledErrors = getHandledNetworkErrors(error);

    yield put(UserInteractionsActions.addToFriendsFailure(handledErrors));
  }
}

function* onAddToFriendsStart() {
  yield takeLatest(
    UserInteractionsActionTypes.ADD_TO_FRIENDS_START,
    addToFriends
  );
}

export default function* userInteractionsSagas() {
  yield all([call(onAddToFriendsStart)]);
}
