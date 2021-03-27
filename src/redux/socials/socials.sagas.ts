import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import UserActionsAPI from '../../apis/user-actions/api';
import { getHandledNetworkErrors } from '../user/user.sagas';
import * as SocialsActions from './socials.actions';
import * as UserActions from '../user/user.actions';
import { SocialsActionTypes } from './socials.types';
import type { GetFriendsStartAction } from '../../types/redux/socials/GetFriendsStart';
import { GetSubscriptionsStartAction } from '../../types/redux/socials/GetSubscriptionsStart';

function* getFriends({ payload }: GetFriendsStartAction) {
  try {
    const { id } = payload;
    const response = yield UserActionsAPI.getFriends(id);

    yield put(SocialsActions.getFriendsSuccess(response.data.friends));
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.getFriendsFailure(handledErrors));
  }
}

function* getFriendRequests() {
  try {
    const response = yield UserActionsAPI.getFriendRequests();

    yield put(SocialsActions.getFriendRequestsSuccess(response.data.requests));
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.getFriendRequestsFailure(handledErrors));
  }
}

function* getSubscriptions({ payload }: GetSubscriptionsStartAction) {
  try {
    const { id } = payload;
    const response = yield UserActionsAPI.getSubscriptions(id);

    yield put(
      SocialsActions.getSubscriptionsSuccess(response.data.subscriptions)
    );
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.getSubscriptionsFailure(handledErrors));
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

function* manageFriends({ payload }) {
  try {
    const { id, rejectRequest, removeFriend } = yield payload;

    yield UserActionsAPI.manageFriends({
      id,
      rejectRequest,
      removeFriend,
    });

    yield put(
      SocialsActions.manageFriendsSuccess({
        id,
        addFriend,
        acceptRequest,
        rejectRequest,
        removeFriend,
      })
    );
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.manageFriendsFailure(handledErrors));
  }
}

function* onManageFriendsStart() {
  yield takeLatest(SocialsActionTypes.MANAGE_FRIENDS_START, manageFriends);
}

export default function* socialsSagas() {
  yield all([
    call(onGetFriendsStart),
    call(onGetSubscriptionsStart),
    call(onGetFriendRequestsStart),
    call(onManageFriendsStart),
  ]);
}