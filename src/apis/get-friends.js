import socialMrk from './social-mrk';

const getFriendsEndpoint = '/user-actions/get-friends/';

const getFriends = (id) => {
  return socialMrk.get(getFriendsEndpoint, {
    id,
  });
};

export default getFriends;
