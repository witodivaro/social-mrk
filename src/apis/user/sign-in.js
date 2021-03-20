import socialMrk from "../social-mrk";

const signInEndpoint = "/user/sign-in/";

const signIn = ({ username, password }) => {
  return socialMrk.post(signInEndpoint, {
    username,
    password,
  });
};

export default signIn;
