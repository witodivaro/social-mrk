import socialMrk from './social-mrk';

const createUserEndpoint = (id) => `user_profile/user-profile-get/${id}/`;

const getUser = (token, id) =>
  socialMrk.get(createUserEndpoint(id), {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

export default getUser;
