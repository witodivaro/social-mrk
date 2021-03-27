import { AnyAction } from 'redux';
import { FETCH_STATES } from '../../config/fetch-states';
import UserPageActionTypes from './user-page.types';

const initialState = {
  user: null,
  errors: null,
  state: '',
  avatarModalShown: false,
};

const userPageReducer = (
  state = initialState,
  { payload, type }: AnyAction
) => {
  switch (type) {
    case UserPageActionTypes.GET_USER_START:
      return {
        ...state,
        state: FETCH_STATES.FETCHING,
        errors: null,
      };

    case UserPageActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        state: FETCH_STATES.SUCCESS,
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
        state: FETCH_STATES.FAILURE,
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
