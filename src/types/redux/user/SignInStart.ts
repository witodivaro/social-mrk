import { UserActionTypes } from '../../../redux/user/user.types';

export interface SignInStartProps {
  username: string;
  password: string;
}

export interface SignInStartAction {
  type: UserActionTypes.SIGN_IN_START;
  payload: { username: string; password: string };
}

export type SignInStart = (props: SignInStartProps) => SignInStartAction;
