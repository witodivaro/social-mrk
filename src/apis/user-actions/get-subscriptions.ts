import { AxiosPromise } from 'axios';
import { UserSubscription } from '../../types/redux/user/User';
import socialMrk from '../social-mrk';

const getSubscriptionsEndpoint = (id: number): string =>
  `/user-actions/get-subscriptions/${id}/`;

const getSubscriptions = (id: number): AxiosPromise<UserSubscription[]> => {
  return socialMrk.get(getSubscriptionsEndpoint(id));
};

export default getSubscriptions;
