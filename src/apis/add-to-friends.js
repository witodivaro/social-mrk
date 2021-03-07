import socialMrk from './social-mrk';

const addToFriendsEndpoint = '/user-actions/add-to-friends/';

function addToFriends({ id, accept }) {
  const addToFriendsBody = Object.assign(
    {},
    {
      id,
    },
    accept !== undefined ? { accept } : null
  );

  return socialMrk.post(addToFriendsEndpoint, addToFriendsBody);
}

export default addToFriends;
