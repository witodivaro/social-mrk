import { SocialsActionTypes } from '../../../redux/socials/socials.types';

export interface GetFriendRequestsStartAction {
  type: SocialsActionTypes.GET_FRIEND_REQUESTS_START;
  payload: {
    id: number;
  };
}

export type GetFriendRequestsStart = (
  id: number
) => GetFriendRequestsStartAction;
