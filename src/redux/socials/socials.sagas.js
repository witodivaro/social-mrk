import { all, call, put, takeLatest } from 'redux-saga/effects';
import UserAPI from '../../apis/user.api';
import UserInteractionsActionTypes from '../user-interactions/user-interactions.types';
import { getHandledNetworkErrors } from '../user/user.sagas';
import * as SocialsActions from './socials.actions';
import SocialsActionTypes from './socials.types';

function* getFriends({ payload }) {
  try {
    const { id } = payload;
    const response = yield UserAPI.getFriends(id);

    yield put(SocialsActions.getFriendsSuccess(response.data.friends));
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.getFriendsFailure(handledErrors));
  }
}

function* getFriendRequests() {
  try {
    const response = yield UserAPI.getFriendRequests();

    yield put(SocialsActions.getFriendRequestsSuccess(response.data.requests));
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.getFriendRequestsFailure(handledErrors));
  }
}

function* getSubscriptions({ payload }) {
  try {
    const { id } = payload;
    const response = yield UserAPI.getSubscriptions(id);

    yield put(
      SocialsActions.getSubscriptionsSuccess(response.data.subscriptions)
    );
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.getSubscriptionsFailure(handledErrors));
  }
}

function* changeLocalSocials({ payload }) {
  if (payload.acceptRequest || payload.rejectRequest) {
    yield put(SocialsActions.removeFriendRequest(payload.id));
  } else if (payload.removeFriend) {
  }
}

function* onGetFriendsStart() {
  yield takeLatest(SocialsActionTypes.GET_FRIENDS_START, getFriends);
}

function* onGetFriendRequestsStart() {
  yield takeLatest(
    SocialsActionTypes.GET_FRIEND_REQUESTS_START,
    getFriendRequests
  );
}

function* onGetSubscriptionsStart() {
  yield takeLatest(
    SocialsActionTypes.GET_SUBSCRIPTIONS_START,
    getSubscriptions
  );
}

function* onManageFriendsSuccess() {
  yield takeLatest(
    UserInteractionsActionTypes.MANAGE_FRIENDS_SUCCESS,
    changeLocalSocials
  );
}

export default function* socialsSagas() {
  yield all([
    call(onGetFriendsStart),
    call(onGetSubscriptionsStart),
    call(onGetFriendRequestsStart),
    call(onManageFriendsSuccess),
  ]);
}
