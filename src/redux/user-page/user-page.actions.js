import UserPageActionTypes from './user-page.types';

export const getUserStart = (token, id) => ({
  type: UserPageActionTypes.GET_USER_START,
  payload: { token, id },
});

export const getUserSuccess = (user) => ({
  type: UserPageActionTypes.GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailure = (error) => ({
  type: UserPageActionTypes.GET_USER_FAILURE,
  payload: error,
});
