import UserActionTypes from './user.types';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import AUTH_STATES from '../../config/auth-states';

const initialState = {
  currentUser: null,
  token: '',
  authErrors: [],
  authState: '',
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
        authState: AUTH_STATES.SIGNING_UP,
      };

    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        authState: AUTH_STATES.SIGN_UP_SUCCESS,
      };

    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        authErrors: payload,
        authState: AUTH_STATES.SIGN_UP_FAILURE,
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
