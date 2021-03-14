import UserInteractionsActionTypes from './user-interactions.types';

export const manageFriendsStart = ({
  id,
  rejectRequest,
  acceptRequest,
  addFriend,
  removeFriend,
}) => ({
  type: UserInteractionsActionTypes.MANAGE_FRIENDS_START,
  payload: { id, acceptRequest, rejectRequest, addFriend, removeFriend },
});

export const manageFriendsSuccess = ({
  id,
  addFriend,
  rejectRequest,
  acceptRequest,
  removeFriend,
}) => ({
  type: UserInteractionsActionTypes.MANAGE_FRIENDS_SUCCESS,
  payload: { id, addFriend, rejectRequest, acceptRequest, removeFriend },
});

export const manageFriendsFailure = (error) => ({
  type: UserInteractionsActionTypes.MANAGE_FRIENDS_FAILURE,
  payload: error,
});
