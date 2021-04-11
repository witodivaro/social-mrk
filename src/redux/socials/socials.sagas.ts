import { all, call, put, takeLatest, StrictEffect } from 'redux-saga/effects';
import { getHandledNetworkErrors } from '../user/user.sagas';
import * as SocialsActions from './socials.actions';
import { SocialsActionTypes } from './socials.types';
import type { GetFriendsStartAction } from '../../types/redux/socials/GetFriendsStart';
import { GetSubscriptionsStartAction } from '../../types/redux/socials/GetSubscriptionsStart';
import socialMrkAPI from '../../apis/social-mrk.api';
import { AxiosPromise, AxiosResponse } from 'axios';
import {
  UserFriend,
  UserFriendRequest,
  UserSubscription,
} from '../../types/redux/user/User';
import { AnyAction } from 'redux';
import { GetFriendRequestsStartAction } from '../../types/redux/socials/GetFriendRequestsStart';

function* getFriends({
  payload,
}: GetFriendsStartAction): Generator<
  AxiosPromise | StrictEffect,
  void,
  AxiosResponse<{ friends: UserFriend[] }>
> {
  try {
    const { id } = payload;
    const response = yield socialMrkAPI.getFriends(id);

    yield put(SocialsActions.getFriendsSuccess(response.data.friends));
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.getFriendsFailure(handledErrors));
  }
}

function* getFriendRequests({
  payload,
}: GetFriendRequestsStartAction): Generator<
  AxiosPromise | StrictEffect,
  void,
  AxiosResponse<{ requests: UserFriendRequest[] }>
> {
  const { id } = payload;
  try {
    const response = yield socialMrkAPI.getFriendRequests(id);

    yield put(SocialsActions.getFriendRequestsSuccess(response.data.requests));
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.getFriendRequestsFailure(handledErrors));
  }
}

function* getSubscriptions({
  payload,
}: GetSubscriptionsStartAction): Generator<
  AxiosPromise | StrictEffect,
  void,
  AxiosResponse<{ subscriptions: UserSubscription[] }>
> {
  try {
    const { id } = payload;
    const response = yield socialMrkAPI.getSubscriptions(id);

    yield put(
      SocialsActions.getSubscriptionsSuccess(response.data.subscriptions)
    );
  } catch (error) {
    const handledErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.getSubscriptionsFailure(handledErrors));
  }
}

function* addFriend({
  payload,
}: AnyAction): Generator<AxiosPromise | StrictEffect, void, AxiosResponse> {
  try {
    const { id } = payload;
    const response = yield socialMrkAPI.addToFriends(id);
    yield put(SocialsActions.addFriendLocal(id));

    yield put(SocialsActions.addFriendSuccess());
  } catch (error) {
    const handledNetworkErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.addFriendFailure(handledNetworkErrors));
  }
}

function* removeFriend({
  payload,
}: AnyAction): Generator<AxiosPromise | StrictEffect, void, AxiosResponse> {
  try {
    const { id } = payload;
    yield socialMrkAPI.removeFriend(id);
    yield put(SocialsActions.removeFriendLocal(id));

    yield put(SocialsActions.removeFriendSuccess());
  } catch (error) {
    const handledNetworkErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.removeFriendFailure(handledNetworkErrors));
  }
}

function* acceptFriendRequest({
  payload,
}: AnyAction): Generator<AxiosPromise | StrictEffect, void, AxiosResponse> {
  try {
    const { id } = payload;
    yield socialMrkAPI.addToFriends(id);
    yield put(SocialsActions.acceptFriendRequestLocal(id));

    yield put(SocialsActions.acceptFriendRequestSuccess());
  } catch (error) {
    const handledNetworkErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.acceptFriendRequestFailure(handledNetworkErrors));
  }
}

function* rejectFriendRequest({
  payload,
}: AnyAction): Generator<AxiosPromise | StrictEffect, void, AxiosResponse> {
  try {
    const { id } = payload;
    yield socialMrkAPI.rejectFriendRequest(id);
    yield put(SocialsActions.rejectFriendRequestLocal(id));

    yield put(SocialsActions.rejectFriendRequestSuccess());
  } catch (error) {
    const handledNetworkErrors = getHandledNetworkErrors(error);

    yield put(SocialsActions.rejectFriendRequestFailure(handledNetworkErrors));
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

function* onAddFriendStart() {
  yield takeLatest(SocialsActionTypes.ADD_FRIEND_START, addFriend);
}

function* onRemoveFriendStart() {
  yield takeLatest(SocialsActionTypes.REMOVE_FRIEND_START, removeFriend);
}

function* onAcceptFriendRequestStart() {
  yield takeLatest(
    SocialsActionTypes.ACCEPT_FRIEND_REQUEST_START,
    acceptFriendRequest
  );
}

function* onRejectFriendRequestStart() {
  yield takeLatest(
    SocialsActionTypes.REJECT_FRIEND_REQUEST_START,
    rejectFriendRequest
  );
}

export default function* socialsSagas() {
  yield all([
    call(onGetFriendsStart),
    call(onGetSubscriptionsStart),
    call(onGetFriendRequestsStart),
    call(onAddFriendStart),
    call(onRemoveFriendStart),
    call(onAcceptFriendRequestStart),
    call(onRejectFriendRequestStart),
  ]);
}
