import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

const rejectFriendRequestEndpoint = '/user-actions/manage-friends/';

function rejectFriendRequest(id: number): AxiosPromise {
  return socialMrk({
    url: rejectFriendRequestEndpoint,
    method: 'POST',
    data: {
      id,
      isRejectRequest: true,
    },
  });
}

export default rejectFriendRequest;
