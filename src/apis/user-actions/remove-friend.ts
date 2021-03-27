import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

const removeFriendEndpoint = '/user-actions/manage-friends/';

function removeFriend(id: number): AxiosPromise {
  return socialMrk({
    url: removeFriendEndpoint,
    method: 'DELETE',
    data: {
      id,
    },
  });
}

export default removeFriend;
