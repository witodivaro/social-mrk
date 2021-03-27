import { AxiosPromise } from 'axios';
import { UserSubscription } from '../../types/redux/user/User';
import socialMrk from '../social-mrk';

const getSubscriptionsEndpoint = '/user-actions/get-subscriptions/';

const getSubscriptions = (id: number): AxiosPromise<UserSubscription[]> => {
  return socialMrk.get(getSubscriptionsEndpoint, {
    params: {
      id,
    },
  });
};

export default getSubscriptions;
