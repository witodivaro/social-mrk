import { UserActionTypes } from '../../../redux/user/user.types';

export interface SignUpStartPayload {
  email: string;
  password: string;
  username: string;
}

export type SignUpStart = (
  payload: SignUpStartPayload
) => {
  type: UserActionTypes.SIGN_UP_START;
  payload: SignUpStartPayload;
};
