import { AxiosPromise } from 'axios';
import { UserFriendRequest } from '../../types/redux/user/User';
import socialMrk from '../social-mrk';

const getFriendRequestsEndpoint = '/user-actions/get-requests/';

const getFriendRequests = (): AxiosPromise<UserFriendRequest[]> => {
  return socialMrk.get(getFriendRequestsEndpoint);
};

export default getFriendRequests;
