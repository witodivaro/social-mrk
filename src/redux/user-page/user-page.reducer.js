import { GET_USER_STATES } from '../../config/user-states';
import UserPageActionTypes from './user-page.types';

const initialState = {
  user: null,
  error: '',
  state: '',
  avatarModalShown: false,
};

const userPageReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case UserPageActionTypes.GET_USER_START:
      return {
        ...state,
        state: GET_USER_STATES.FETCHING,
      };

    case UserPageActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        state: GET_USER_STATES.SUCCESS,
      };

    case UserPageActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        error: payload,
        state: GET_USER_STATES.FAILURE,
      };

    case UserPageActionTypes.TOGGLE_AVATAR_MODAL_SHOWN:
      return {
        ...state,
        avatarModalShown: !state.avatarModalShown,
      };

    default:
      return state;
  }
};

export default userPageReducer;
