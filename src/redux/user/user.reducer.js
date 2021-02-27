import UserActionTypes from './user.types';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

const initialState = {
  currentUser: null,
  token: '',
  authErrors: [],
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserActionTypes.SET_TOKEN:
      if (payload === state.token) return state;
      return {
        ...state,
        token: payload,
      };

    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        authErrors: payload,
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
