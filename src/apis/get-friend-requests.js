import socialMrk from './social-mrk';

const getFriendRequestsEndpoint = '/user-actions/get-requests/';

const getFriendRequests = () => {
  return socialMrk.get(getFriendRequestsEndpoint);
};

export default getFriendRequests;
