import UserActionTypes from './user.types';

export const setToken = (token) => ({
  type: UserActionTypes.SET_TOKEN,
  payload: token,
});
