import { UserActionTypes } from '../../../redux/user/user.types';
import { User } from './User';

export interface GetCurrentUserSuccessAction {
  type: UserActionTypes.GET_CURRENT_USER_SUCCESS;
  payload: { currentUser: User };
}

export type GetCurrentUserSuccess = ({
  currentUser,
}: {
  currentUser: User;
}) => GetCurrentUserSuccessAction;
