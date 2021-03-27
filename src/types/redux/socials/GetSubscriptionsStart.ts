import { SocialsActionTypes } from '../../../redux/socials/socials.types';

export interface GetSubscriptionsStartAction {
  type: SocialsActionTypes.GET_SUBSCRIPTIONS_START;
  payload: {
    id: number;
  };
}

export type GetSubscriptionsStart = (id: number) => GetSubscriptionsStartAction;
