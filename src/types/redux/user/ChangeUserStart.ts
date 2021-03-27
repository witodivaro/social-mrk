import { UserActionTypes } from '../../../redux/user/user.types';
import { UserUpdate } from './User';

export interface ChangeUserStartAction {
  type: UserActionTypes.CHANGE_USER_START;
  payload: UserUpdate;
}

export type ChangeUserStart = (userData: UserUpdate) => ChangeUserStartAction;
