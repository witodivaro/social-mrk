import { AxiosPromise } from 'axios';
import { UserFriendRequest } from '../../types/redux/user/User';
import socialMrk from '../social-mrk';

const getFriendRequestsEndpoint = (id: number): string =>
  `/user-actions/get-requests/${id}/`;

const getFriendRequests = (id: number): AxiosPromise<UserFriendRequest[]> => {
  return socialMrk.get(getFriendRequestsEndpoint(id));
};

export default getFriendRequests;
