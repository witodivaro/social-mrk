import { AxiosPromise } from 'axios';
import { UserFriend } from '../../types/redux/user/User';
import socialMrk from '../social-mrk';

const unsubscribeEndpoint = '/user-actions/manage-subscriptions/';

const unsubscribe = (id: number): AxiosPromise<UserFriend[]> => {
  return socialMrk.delete(unsubscribeEndpoint, {
    data: {
      id,
    },
  });
};

export default unsubscribe;
