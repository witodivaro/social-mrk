import UserPageActionTypes from '../../../redux/user-page/user-page.types';

export interface GetUserStartAction {
  type: UserPageActionTypes.GET_USER_START;
  payload: { id: number };
}
