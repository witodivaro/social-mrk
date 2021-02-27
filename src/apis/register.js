import socialMrk from './social-mrk';

const regEndpoint = '/user/reg/';

const register = ({ username, email, password }) => {
  return socialMrk.post(regEndpoint, {
    username,
    email,
    password,
  });
};

export default register;
