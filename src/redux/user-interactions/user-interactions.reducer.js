import { MANAGE_FRIENDS_STATES } from '../../config/user-states';
import UserInteractionsActionTypes from './user-interactions.types';

const initialState = {
  manageFriendsState: '',
  manageFriendsErrors: null,
};

const userInteractionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserInteractionsActionTypes.MANAGE_FRIENDS_START:
      return {
        ...state,
        manageFriendsState: MANAGE_FRIENDS_STATES.FETCHING,
        manageFriendsErrors: null,
      };

    case UserInteractionsActionTypes.MANAGE_FRIENDS_SUCCESS:
      return {
        ...state,
        manageFriendsState: MANAGE_FRIENDS_STATES.SUCCESS,
        manageFriendsErrors: null,
      };

    case UserInteractionsActionTypes.MANAGE_FRIENDS_FAILURE:
      return {
        ...state,
        manageFriendsState: MANAGE_FRIENDS_STATES.FAILURE,
        manageFriendsErrors: payload,
      };

    default:
      return state;
  }
};

export default userInteractionsReducer;
