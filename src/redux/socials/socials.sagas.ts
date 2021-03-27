import {
  all,
  call,
  put,
  takeLatest,
  select,
  StrictEffect,
} from 'redux-saga/effects';
import { getHandledNetworkErrors } from '../user/user.sagas';
import * as SocialsActions from './socials.actions';
import * as UserActions from '../user/user.actions';
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

function* getFriendRequests(): Generator<
  AxiosPromise | StrictEffect,
  void,
  AxiosResponse<{ requests: UserFriendRequest[] }>
> {
  try {
    const response = yield socialMrkAPI.getFriendRequests();

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

export default function* socialsSagas() {
  yield all([
    call(onGetFriendsStart),
    call(onGetSubscriptionsStart),
    call(onGetFriendRequestsStart),
  ]);
}
