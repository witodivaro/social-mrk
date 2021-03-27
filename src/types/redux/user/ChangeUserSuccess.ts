import { UserActionTypes } from '../../../redux/user/user.types';
import type { UserUpdate } from './User';

export interface ChangeUserSuccessAction {
  type: UserActionTypes.CHANGE_USER_SUCCESS;
  payload: { changedUserData: UserUpdate };
}

export type ChangeUserSuccess = ({
  changedUserData,
}: {
  changedUserData: UserUpdate;
}) => ChangeUserSuccessAction;
