import SocialsActionTypes from './socials.types';

export const getFriendsStart = (id) => ({
  type: SocialsActionTypes.GET_FRIENDS_START,
  payload: { id },
});

export const getFriendsSuccess = (friends) => ({
  type: SocialsActionTypes.GET_FRIENDS_SUCCESS,
  payload: { friends },
});

export const getFriendsFailure = (errors) => ({
  type: SocialsActionTypes.GET_FRIENDS_FAILURE,
  payload: { errors },
});

export const getFriendRequestsStart = () => ({
  type: SocialsActionTypes.GET_FRIEND_REQUESTS_START,
});

export const getFriendRequestsSuccess = (friendRequests) => ({
  type: SocialsActionTypes.GET_FRIEND_REQUESTS_SUCCESS,
  payload: { friendRequests },
});

export const getFriendRequestsFailure = (errors) => ({
  type: SocialsActionTypes.GET_FRIEND_REQUESTS_FAILURE,
  payload: { errors },
});

export const getSubscriptionsStart = (id) => ({
  type: SocialsActionTypes.GET_SUBSCRIPTIONS_START,
  payload: { id },
});

export const getSubscriptionsSuccess = (subscriptions) => ({
  type: SocialsActionTypes.GET_SUBSCRIPTIONS_SUCCESS,
  payload: { subscriptions },
});

export const getSubscriptionsFailure = (errors) => ({
  type: SocialsActionTypes.GET_SUBSCRIPTIONS_FAILURE,
  payload: { errors },
});
