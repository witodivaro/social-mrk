import {
  HandledChangeUserErrors,
  HandledSignInErrors,
  HandledSignUpErrors,
} from '../../types/HandledErrors';
import { GetCurrentUserSuccess } from '../../types/redux/user/GetCurrentUserSuccess';
import type { SignInStart } from '../../types/redux/user/SignInStart';
import type { SignUpStart } from '../../types/redux/user/SignUpStart';
import type { ChangeUserStart } from '../../types/redux/user/ChangeUserStart';
import { UserActionTypes } from './user.types';
import { ChangeUserSuccess } from '../../types/redux/user/ChangeUserSuccess';
import { UserUpdate } from '../../types/redux/user/User';

export const signOut = () => ({
  type: UserActionTypes.SIGN_OUT,
});

export const signUpStart: SignUpStart = (signUpCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: signUpCredentials,
});

export const signUpFailure = (handledErrors: HandledSignUpErrors) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: handledErrors,
});

export const signUpSuccess = () => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
});

export const signInStart: SignInStart = ({ username, password }) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: { username, password },
});

export const signInSuccess = (token: string) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: token,
});

export const signInFailure = (handledErrors: HandledSignInErrors) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: handledErrors,
});

export const getCurrentUserStart = () => ({
  type: UserActionTypes.GET_CURRENT_USER_START,
});

export const getCurrentUserSuccess: GetCurrentUserSuccess = ({
  currentUser,
}) => ({
  type: UserActionTypes.GET_CURRENT_USER_SUCCESS,
  payload: { currentUser },
});

export const getCurrentUserFailure = (error: string) => ({
  type: UserActionTypes.GET_CURRENT_USER_FAILURE,
  payload: error,
});

export const changeUserStart: ChangeUserStart = (userData) => ({
  type: UserActionTypes.CHANGE_USER_START,
  payload: userData,
});

export const changeUserSuccess: ChangeUserSuccess = ({ changedUserData }) => ({
  type: UserActionTypes.CHANGE_USER_SUCCESS,
  payload: { changedUserData },
});

export const changeUserFailure = (error: HandledChangeUserErrors) => ({
  type: UserActionTypes.CHANGE_USER_FAILURE,
  payload: error,
});

export const updateCurrentUser = (updatedData: UserUpdate) => ({
  type: UserActionTypes.UPDATE_CURRENT_USER,
  payload: updatedData,
});

export const compressAndChangeUserAvatar = (imageFile: any) => ({
  type: UserActionTypes.COMPRESS_AND_CHANGE_USER_AVATAR,
  payload: { imageFile },
});
