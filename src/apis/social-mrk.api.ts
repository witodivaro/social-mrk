import addToFriends from './user-actions/add-to-friends';
import getFriendRequests from './user-actions/get-friend-requests';
import getFriends from './user-actions/get-friends';
import getSubscriptions from './user-actions/get-subscriptions';
import rejectFriendRequest from './user-actions/reject-friend-request';
import removeFriend from './user-actions/remove-friend';
import sendMessage from './user-actions/send-message';
import unsubscribe from './user-actions/unsubscribe';
import changeUser from './user-profile/change-user';
import getUser from './user-profile/get-user';
import getCurrentUser from './user-profile/my';
import signIn from './user/sign-in';
import signUp from './user/sign-up';
import getAllMessages from './user-actions/get-all-messages';

export default {
  signIn,
  signUp,
  getFriends,
  getFriendRequests,
  getSubscriptions,
  getAllMessages,
  changeUser,
  getUser,
  sendMessage,
  addToFriends,
  removeFriend,
  unsubscribe,
  rejectFriendRequest,
  getCurrentUser,
};
