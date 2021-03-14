import { GET_USER_STATES } from '../../config/user-states';
import UserPageActionTypes from './user-page.types';

const initialState = {
  user: null,
  errors: null,
  state: '',
  avatarModalShown: false,
};

const userPageReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case UserPageActionTypes.GET_USER_START:
      return {
        ...state,
        state: GET_USER_STATES.FETCHING,
        errors: null,
      };

    case UserPageActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        state: GET_USER_STATES.SUCCESS,
      };

    case UserPageActionTypes.SET_USER_PAGE_USER:
      return {
        ...state,
        user: payload,
      };

    case UserPageActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        errors: payload,
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
