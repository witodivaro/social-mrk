import { AxiosPromise } from 'axios';
import socialMrk from '../social-mrk';

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

const signUpEndpoint = '/user/sign-up/';

const signUp = ({ username, email, password }: SignUpProps): AxiosPromise => {
  return socialMrk.post(signUpEndpoint, {
    username,
    email,
    password,
  });
};

export default signUp;
