import { all, call, put, takeLatest, select } from "redux-saga/effects";
import UserActionsAPI from "../../apis/user-actions/api";
import { getHandledNetworkErrors } from "../user/user.sagas";
import * as SocialsActions from "./socials.actions";
import SocialsActionTypes from "./socials.types";

function* getFriends({ payload }) {
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

function* getSubscriptions({ payload }) {
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

function* changeLocalSocials({ payload }) {
  if (payload.acceptRequest || payload.rejectRequest) {
    yield put(SocialsActions.removeFriendRequest(payload.id));
    yield put;
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
    SocialsActionTypes.MANAGE_FRIENDS_SUCCESS,
    changeLocalSocials
  );
}

function* manageFriends({ payload }) {
  try {
    const {
      id,
      acceptRequest,
      rejectRequest,
      addFriend,
      removeFriend,
    } = yield payload;

    yield UserActionsAPI.manageFriends({
      id,
      acceptRequest,
      rejectRequest,
      addFriend,
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
    call(onManageFriendsSuccess),
  ]);
}
