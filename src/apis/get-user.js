import socialMrk from './social-mrk';

const getUserEndpoint = 'user_profile/get/';

const getUser = (id) => {
  return socialMrk.get(getUserEndpoint, {
    params: {
      id,
    },
  });
};

export default getUser;
