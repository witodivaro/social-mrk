import socialMrk from "../social-mrk";

const getFriendsEndpoint = "/user-actions/get-friends/";

const getFriends = (id) => {
  return socialMrk.get(getFriendsEndpoint, {
    params: {
      id,
    },
  });
};

export default getFriends;
