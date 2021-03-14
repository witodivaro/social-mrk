import changeUser from './change-user';
import getUser from './get-user';
import signIn from './sign-in';
import signUp from './sign-up';
import manageFriends from './manage-friends';
import getFriends from './get-friends';
import getSubscriptions from './get-subscriptions';
import getFriendRequests from './get-friend-requests';

const UserAPI = {
  changeUser,
  getUser,
  signIn,
  signUp,
  getFriends,
  getSubscriptions,
  getFriendRequests,
  manageFriends,
};

export default UserAPI;
