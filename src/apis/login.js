import socialMrk from './social-mrk';

const loginEndpoint = '/user/login/';

const login = ({ username, password }) => {
  return socialMrk.post(loginEndpoint, {
    username,
    password,
  });
};

export default login;
