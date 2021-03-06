import UserActionTypes from './user.types';

export const signOut = () => ({
  type: UserActionTypes.SIGN_OUT,
});

export const signUpStart = ({ email, password, username }) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: { email, password, username },
});

export const signUpFailure = (errors) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: errors,
});

export const signUpSuccess = () => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
});

export const signInStart = ({ username, password }) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: { username, password },
});

export const signInSuccess = (token) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: token,
});

export const signInFailure = (errors) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: errors,
});

export const getCurrentUserStart = () => ({
  type: UserActionTypes.GET_CURRENT_USER_START,
});

export const getCurrentUserSuccess = (currentUser) => ({
  type: UserActionTypes.GET_CURRENT_USER_SUCCESS,
  payload: currentUser,
});

export const getCurrentUserFailure = (error) => ({
  type: UserActionTypes.GET_CURRENT_USER_FAILURE,
  payload: error,
});

export const changeUserStart = (userData) => ({
  type: UserActionTypes.CHANGE_USER_START,
  payload: userData,
});

export const changeUserSuccess = () => ({
  type: UserActionTypes.CHANGE_USER_SUCCESS,
});

export const changeUserFailure = (error) => ({
  type: UserActionTypes.CHANGE_USER_FAILURE,
  payload: error,
});
