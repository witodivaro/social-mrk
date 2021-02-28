import socialMrk from './social-mrk';

const changeUserEndpoint = '/user_profile/change-user-profile/';

const changeUser = (token, userData) =>
  socialMrk.post(
    changeUserEndpoint,
    {
      ...userData,
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

export default changeUser;
