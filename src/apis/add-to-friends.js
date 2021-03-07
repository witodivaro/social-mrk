import socialMrk from './social-mrk';

const addToFriendsEndpoint = '/user-actions/add-to-friends/';

const addToFriends = (id) => {
  return socialMrk.post(addToFriendsEndpoint, {
    id,
  });
};

export default addToFriends;
