import socialMrk from './social-mrk';

const changeUserEndpoint = '/user_profile/change-user-profile/';

const changeUser = (userData) =>
  socialMrk.post(changeUserEndpoint, {
    ...userData,
  });

export default changeUser;
