import socialMrk from "../social-mrk";

const changeUserEndpoint = "/user-profile/change/";

const changeUser = (userData) => {
  socialMrk.post(changeUserEndpoint, {
    ...userData,
  });
};

export default changeUser;
