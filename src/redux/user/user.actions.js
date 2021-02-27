import UserActionTypes from './user.types';

export const setToken = (token) => ({
  type: UserActionTypes.SET_TOKEN,
  payload: token,
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
