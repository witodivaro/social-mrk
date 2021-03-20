import UserActionTypes from "./user.types";
import { persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import {
  CHANGE_USER_STATES,
  SIGN_IN_STATES,
  SIGN_UP_STATES,
} from "../../config/user-states";

const initialState = {
  currentUser: null,
  token: "",
  signInErrors: null,
  signUpErrors: null,
  changeUserErrors: null,
  signUpState: "",
  signInState: "",
  changeUserState: "",
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserActionTypes.SIGN_OUT:
      return {
        ...state,
        token: "",
        currentUser: null,
        signUpState: "",
        signInState: "",
      };

    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        signUpState: SIGN_UP_STATES.FETCHING,
      };

    case UserActionTypes.SIGN_IN_START:
      return {
        ...state,
        signInState: SIGN_IN_STATES.FETCHING,
        signInErrors: null,
      };

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        token: payload,
        signInState: SIGN_IN_STATES.SUCCESS,
        signInErrors: null,
        signUpErrors: null,
      };

    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpState: SIGN_UP_STATES.SUCCESS,
        signUpErrors: null,
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
        currentUser: payload.currentUser,
      };

    case UserActionTypes.CHANGE_USER_START:
      return {
        ...state,
        changeUserState: CHANGE_USER_STATES.FETCHING,
        changeUserErrors: null,
      };

    case UserActionTypes.CHANGE_USER_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, ...payload.changedUserData },
        changeUserState: CHANGE_USER_STATES.SUCCESS,
        changeUserErrors: null,
      };

    case UserActionTypes.CHANGE_USER_FAILURE:
      return {
        ...state,
        changeUserState: CHANGE_USER_STATES.FAILURE,
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
  key: "token",
  storage: localStorage,
  whitelist: ["token", "currentUser"],
};

export default persistReducer(persistConfig, userReducer);
