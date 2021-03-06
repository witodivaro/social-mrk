import UserPageActionTypes from './user-page.types';

export const getUserStart = (id) => ({
  type: UserPageActionTypes.GET_USER_START,
  payload: id,
});

export const getUserSuccess = (user) => ({
  type: UserPageActionTypes.GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailure = (error) => ({
  type: UserPageActionTypes.GET_USER_FAILURE,
  payload: error,
});

export const refreshPage = () => ({
  type: UserPageActionTypes.REFRESH_PAGE,
});

export const toggleAvatarModalShown = () => ({
  type: UserPageActionTypes.TOGGLE_AVATAR_MODAL_SHOWN,
});
