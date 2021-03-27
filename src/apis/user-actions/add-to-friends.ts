import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

const addToFriendsEndpoint = '/user-actions/manage-friends/';

function addToFriends(id: number): AxiosPromise {
  return socialMrk({
    url: addToFriendsEndpoint,
    method: 'POST',
    data: {
      id,
    },
  });
}

export default addToFriends;
