import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

const signInEndpoint = '/user/sign-in/';

interface SignInProps {
  username: string;
  password: string;
}

const signIn = ({ username, password }: SignInProps): AxiosPromise => {
  return socialMrk.post(signInEndpoint, {
    username,
    password,
  });
};

export default signIn;
