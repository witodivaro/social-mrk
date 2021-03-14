import UserPageActionTypes from './user-page.types';

export const getUserStart = (id) => ({
  type: UserPageActionTypes.GET_USER_START,
  payload: id,
});

export const getUserSuccess = (user) => ({
  type: UserPageActionTypes.GET_USER_SUCCESS,
  payload: user,
});

export const setUserPageUser = (user) => ({
  type: UserPageActionTypes.SET_USER_PAGE_USER,
  payload: user,
});

export const getUserFailure = (error) => ({
  type: UserPageActionTypes.GET_USER_FAILURE,
  payload: error,
});

export const toggleAvatarModalShown = () => ({
  type: UserPageActionTypes.TOGGLE_AVATAR_MODAL_SHOWN,
});
