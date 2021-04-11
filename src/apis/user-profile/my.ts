import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

const getCurrentUserEndpoint = '/user-profile/my/';

const getCurrentUser = (): AxiosPromise => {
  return socialMrk.get(getCurrentUserEndpoint);
};

export default getCurrentUser;
