import addToFriends from './user-actions/add-to-friends';
import getFriendRequests from './user-actions/get-friend-requests';
import getFriends from './user-actions/get-friends';
import getMessages from './user-actions/get-messages';
import getSubscriptions from './user-actions/get-subscriptions';
import rejectFriendRequest from './user-actions/reject-friend-request';
import removeFriend from './user-actions/remove-friend';
import sendMessage from './user-actions/send-message';
import changeUser from './user-profile/change-user';
import getUser from './user-profile/get-user';
import signIn from './user/sign-in';
import signUp from './user/sign-up';

export default {
  signIn,
  signUp,
  getFriends,
  getFriendRequests,
  getSubscriptions,
  changeUser,
  getUser,
  getMessages,
  sendMessage,
  addToFriends,
  removeFriend,
  rejectFriendRequest,
};
