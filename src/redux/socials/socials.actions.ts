import { HandledNetworkError } from '../../types/HandledErrors';
import { GetFriendRequestsStartAction } from '../../types/redux/socials/GetFriendRequestsStart';
import { GetFriendsStartAction } from '../../types/redux/socials/GetFriendsStart';
import {
  UserFriend,
  UserFriendRequest,
  UserSubscription,
} from '../../types/redux/user/User';
import { SocialsActionTypes } from './socials.types';

export const getFriendsStart = (id: number) => ({
  type: SocialsActionTypes.GET_FRIENDS_START,
  payload: { id },
});

export const getFriendsSuccess = (friends: UserFriend[]) => ({
  type: SocialsActionTypes.GET_FRIENDS_SUCCESS,
  payload: { friends },
});

export const getFriendsFailure = (errors: HandledNetworkError) => ({
  type: SocialsActionTypes.GET_FRIENDS_FAILURE,
  payload: { errors },
});

export const getFriendRequestsStart = (
  id: number
): GetFriendRequestsStartAction => ({
  type: SocialsActionTypes.GET_FRIEND_REQUESTS_START,
  payload: { id },
});

export const getFriendRequestsSuccess = (
  friendRequests: UserFriendRequest[]
) => ({
  type: SocialsActionTypes.GET_FRIEND_REQUESTS_SUCCESS,
  payload: { friendRequests },
});

export const getFriendRequestsFailure = (errors: HandledNetworkError) => ({
  type: SocialsActionTypes.GET_FRIEND_REQUESTS_FAILURE,
  payload: { errors },
});

export const getSubscriptionsStart = (id: number) => ({
  type: SocialsActionTypes.GET_SUBSCRIPTIONS_START,
  payload: { id },
});

export const getSubscriptionsSuccess = (subscriptions: UserSubscription[]) => ({
  type: SocialsActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
  payload: { subscriptions },
});

export const getSubscriptionsFailure = (errors: HandledNetworkError) => ({
  type: SocialsActionTypes.GET_SUBSCRIPTIONS_FAILURE,
  payload: { errors },
});

export const rejectFriendRequestLocal = (id: number) => ({
  type: SocialsActionTypes.REJECT_FRIEND_REQUEST_LOCAL,
  payload: { id },
});

export const rejectFriendRequestStart = (id: number) => ({
  type: SocialsActionTypes.REJECT_FRIEND_REQUEST_START,
  payload: { id },
});

export const rejectFriendRequestSuccess = () => ({
  type: SocialsActionTypes.REJECT_FRIEND_REQUEST_SUCCESS,
});

export const rejectFriendRequestFailure = (error: HandledNetworkError) => ({
  type: SocialsActionTypes.REJECT_FRIEND_REQUEST_FAILURE,
  payload: error,
});

export const acceptFriendRequestLocal = (id: number) => ({
  type: SocialsActionTypes.ACCEPT_FRIEND_REQUEST_LOCAL,
  payload: { id },
});

export const acceptFriendRequestStart = (id: number) => ({
  type: SocialsActionTypes.ACCEPT_FRIEND_REQUEST_START,
  payload: { id },
});

export const acceptFriendRequestSuccess = () => ({
  type: SocialsActionTypes.ACCEPT_FRIEND_REQUEST_SUCCESS,
});

export const acceptFriendRequestFailure = (error: HandledNetworkError) => ({
  type: SocialsActionTypes.ACCEPT_FRIEND_REQUEST_FAILURE,
  payload: error,
});

export const removeFriendStart = (id: number) => ({
  type: SocialsActionTypes.REMOVE_FRIEND_START,
  payload: { id },
});

export const removeFriendLocal = (id: number) => ({
  type: SocialsActionTypes.REMOVE_FRIEND_LOCAL,
  payload: { id },
});

export const removeFriendSuccess = () => ({
  type: SocialsActionTypes.REMOVE_FRIEND_SUCCESS,
});

export const removeFriendFailure = (error: HandledNetworkError) => ({
  type: SocialsActionTypes.REMOVE_FRIEND_FAILURE,
  payload: error,
});

export const addFriendStart = (id: number) => ({
  type: SocialsActionTypes.ADD_FRIEND_START,
  payload: { id },
});

export const addFriendLocal = (id: number) => ({
  type: SocialsActionTypes.ADD_FRIEND_LOCAL,
  payload: { id },
});

export const addFriendSuccess = () => ({
  type: SocialsActionTypes.ADD_FRIEND_SUCCESS,
});

export const addFriendFailure = (error: HandledNetworkError) => ({
  type: SocialsActionTypes.ADD_FRIEND_FAILURE,
  payload: error,
});
