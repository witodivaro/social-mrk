import { UserActionTypes } from './user.types';
import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import { AnyAction } from 'redux';
import type { User } from '../../types/redux/user/User';
import {
  HandledChangeUserErrors,
  HandledSignInErrors,
  HandledSignUpErrors,
} from '../../types/HandledErrors';
import { FETCH_STATES } from '../../config/fetch-states';

interface UserState {
  currentUser: User | null;
  token: string;
  signInErrors: HandledSignInErrors | null;
  signUpErrors: HandledSignUpErrors | null;
  changeUserErrors: HandledChangeUserErrors | null;
  signUpState: string;
  signInState: string;
  changeUserState: string;
}

const initialState: UserState = {
  currentUser: null,
  token: '',
  signInErrors: null,
  signUpErrors: null,
  changeUserErrors: null,
  signUpState: '',
  signInState: '',
  changeUserState: '',
};

const userReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case UserActionTypes.SIGN_OUT:
      return {
        ...state,
        token: '',
        currentUser: null,
        signUpState: '',
        signInState: '',
      };

    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        signUpState: FETCH_STATES.FETCHING,
      };

    case UserActionTypes.SIGN_IN_START:
      return {
        ...state,
        signInState: FETCH_STATES.FETCHING,
        signInErrors: null,
      };

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: payload,
        signInState: FETCH_STATES.SUCCESS,
        signInErrors: null,
        signUpErrors: null,
      };

    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpState: FETCH_STATES.SUCCESS,
        signUpErrors: null,
      };

    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        signInErrors: payload,
        signInState: FETCH_STATES.FAILURE,
      };

    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        signUpErrors: payload,
        signUpState: FETCH_STATES.FAILURE,
      };

    case UserActionTypes.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload.currentUser,
      };

    case UserActionTypes.CHANGE_USER_START:
      return {
        ...state,
        changeUserState: FETCH_STATES.FETCHING,
        changeUserErrors: null,
      };

    case UserActionTypes.CHANGE_USER_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...payload.changedUserData },
        changeUserState: FETCH_STATES.SUCCESS,
        changeUserErrors: null,
      };

    case UserActionTypes.CHANGE_USER_FAILURE:
      return {
        ...state,
        changeUserState: FETCH_STATES.FAILURE,
        changeUserErrors: payload,
      };

    case UserActionTypes.UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...payload,
        },
      };

    default:
      return state;
  }
};

const persistConfig = {
  key: 'token',
  storage: localStorage,
  whitelist: ['token', 'currentUser'],
};

export default persistReducer(persistConfig, userReducer);
