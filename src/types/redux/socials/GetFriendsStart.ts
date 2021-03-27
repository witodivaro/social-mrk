import { SocialsActionTypes } from '../../../redux/socials/socials.types';

export interface GetFriendsStartAction {
  type: SocialsActionTypes.GET_FRIENDS_START;
  payload: {
    id: number;
  };
}

export type GetFriendsStart = (id: number) => GetFriendsStartAction;
