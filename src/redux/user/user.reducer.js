import UserActionTypes from './user.types';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';

const initialState = {
  currentUser: null,
  token: '',
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserActionTypes.ADD_TOKEN:
      if (payload === state.token) return state;

      return {
        ...state,
        token: payload,
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
