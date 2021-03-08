import UserInteractionsActionTypes from './user-interactions.types';

export const addToFriendsStart = ({ id, accept }) => ({
  type: UserInteractionsActionTypes.ADD_TO_FRIENDS_START,
  payload: { id, accept },
});

export const addToFriendsSuccess = () => ({
  type: UserInteractionsActionTypes.ADD_TO_FRIENDS_SUCCESS,
});

export const addToFriendsFailure = (error) => ({
  type: UserInteractionsActionTypes.ADD_TO_FRIENDS_FAILURE,
  payload: error,
});
