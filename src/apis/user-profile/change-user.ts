import { AxiosPromise } from 'axios';
import { UserUpdate } from '../../types/redux/user/User';
import socialMrk from '../social-mrk';

const changeUserEndpoint = '/user-profile/change/';

const changeUser = (userData: UserUpdate): AxiosPromise => {
  return socialMrk.post(changeUserEndpoint, {
    ...userData,
  });
};

export default changeUser;
