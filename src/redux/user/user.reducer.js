import UserActionTypes from './user.types';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import { SIGN_UP_STATES, SIGN_IN_STATES } from '../../config/auth-states';

const initialState = {
  currentUser: null,
  token: '',
  authErrors: [],
  signUpState: '',
  signInState: '',
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      if (payload === state.token) return state;
      return {
        ...state,
        token: payload,
      };

    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        signUpState: SIGN_UP_STATES.SIGNING,
      };

    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpState: SIGN_UP_STATES.SUCCESS,
      };

    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        authErrors: payload,
        signInState: SIGN_IN_STATES.FAILURE,
      };
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        authErrors: payload,
        signUpState: SIGN_UP_STATES.FAILURE,
      };

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
