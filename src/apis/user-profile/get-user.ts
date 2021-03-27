import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

const getUserEndpoint = '/user-profile/get/';

const getUser = (id: number): AxiosPromise => {
  return socialMrk.get(getUserEndpoint, {
    params: {
      id,
    },
  });
};

export default getUser;
