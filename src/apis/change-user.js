import socialMrk from './social-mrk';

const changeUserEndpoint = '/user_profile/change/';

const changeUser = (userData) =>
  socialMrk.post(changeUserEndpoint, {
    ...userData,
  });

export default changeUser;
