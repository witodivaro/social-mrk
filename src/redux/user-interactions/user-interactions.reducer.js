import { ADD_TO_FRIENDS_STATES } from '../../config/user-states';
import UserInteractionsActionTypes from './user-interactions.types';

const initialState = {
  addToFriendsState: '',
  addToFriendsError: null,
};

const userInteractionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserInteractionsActionTypes.ADD_TO_FRIENDS_START:
      return {
        ...state,
        addToFriendsState: ADD_TO_FRIENDS_STATES.FETCHING,
        addToFriendsError: null,
      };

    default:
      return state;
  }
};

export default userInteractionsReducer;
