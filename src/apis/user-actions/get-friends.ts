import { AxiosPromise } from 'axios';
import { UserFriend } from '../../types/redux/user/User';
import socialMrk from '../social-mrk';

const getFriendsEndpoint = (id: number): string =>
  `/user-actions/get-friends/${id}/`;

const getFriends = (id: number): AxiosPromise<UserFriend[]> => {
  return socialMrk.get(getFriendsEndpoint(id));
};

export default getFriends;
