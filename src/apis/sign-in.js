import socialMrk from './social-mrk';

const signInEndpoint = '/user/login/';

const signIn = ({ username, password }) => {
  return socialMrk.post(signInEndpoint, {
    username,
    password,
  });
};

export default signIn;
