import UserActionTypes from './user.types';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import { SIGN_UP_STATES, SIGN_IN_STATES } from '../../config/auth-states';

const initialState = {
  currentUser: null,
  token: '',
  signInErrors: [],
  signUpErrors: [],
  signUpState: '',
  signInState: '',
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        signUpState: SIGN_UP_STATES.SIGNING,
      };

    case UserActionTypes.SIGN_IN_START:
      return {
        ...state,
        signInState: SIGN_IN_STATES.SIGNING,
      };

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: payload,
        signInState: SIGN_IN_STATES.SUCCESS,
      };

    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpState: SIGN_UP_STATES.SUCCESS,
      };

    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        signInErrors: payload,
        signInState: SIGN_IN_STATES.FAILURE,
      };

    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpErrors: payload,
        signUpState: SIGN_UP_STATES.FAILURE,
      };

    case UserActionTypes.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload
      }

    default:
      return state;
  }
};

const persistConfig = {
  key: 'token',
  storage: localStorage,
  whitelist: ['token'],
};

export default persistReducer(persistConfig, userReducer);
