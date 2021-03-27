import { AxiosPromise } from 'axios';
import { UserFriend } from '../../types/redux/user/User';
import socialMrk from '../social-mrk';

const getFriendsEndpoint = '/user-actions/get-friends/';

const getFriends = (id: number): AxiosPromise<UserFriend[]> => {
  return socialMrk.get(getFriendsEndpoint, {
    params: {
      id,
    },
  });
};

export default getFriends;
