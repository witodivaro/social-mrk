import socialMrk from './social-mrk';

const signUpEndpoint = '/user/sign-up/';

const signUp = ({ username, email, password }) => {
  return socialMrk.post(signUpEndpoint, {
    username,
    email,
    password,
  });
};

export default signUp;
