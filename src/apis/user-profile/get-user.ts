import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

const getUserEndpoint = (id: number) => `/user-profile/${id}/`;

const getUser = (id: number): AxiosPromise => {
  return socialMrk.get(getUserEndpoint(id));
};

export default getUser;
