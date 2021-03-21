import manageFriends from './manage-friends';
import getFriends from './get-friends';
import getSubscriptions from './get-subscriptions';
import getFriendRequests from './get-friend-requests';
import messages from './messages';

const UserActionsAPI = {
  getFriends,
  getSubscriptions,
  getFriendRequests,
  manageFriends,
  messages,
};

export default UserActionsAPI;
