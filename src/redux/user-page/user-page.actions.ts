import { HandledGetUserErrors } from '../../types/HandledErrors';
import { User } from '../../types/redux/user/User';
import UserPageActionTypes from './user-page.types';

export const getUserStart = (id: number) => ({
  type: UserPageActionTypes.GET_USER_START,
  payload: { id },
});

export const getUserSuccess = (user: User) => ({
  type: UserPageActionTypes.GET_USER_SUCCESS,
  payload: user,
});

export const setUserPageUser = (user: User) => ({
  type: UserPageActionTypes.SET_USER_PAGE_USER,
  payload: user,
});

export const getUserFailure = (error: HandledGetUserErrors) => ({
  type: UserPageActionTypes.GET_USER_FAILURE,
  payload: error,
});

export const toggleAvatarModalShown = () => ({
  type: UserPageActionTypes.TOGGLE_AVATAR_MODAL_SHOWN,
});
