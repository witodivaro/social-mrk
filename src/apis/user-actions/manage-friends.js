import socialMrk from "../social-mrk";

const addToFriendsEndpoint = "/user-actions/manage-friends/";

function manageFriends({ id, rejectRequest, removeFriend }) {
  return socialMrk({
    url: addToFriendsEndpoint,
    method: removeFriend ? "DELETE" : "POST",
    data: {
      ...Object.assign({ id }, rejectRequest ? { rejectRequest: true } : null),
    },
  });
}

export default manageFriends;
