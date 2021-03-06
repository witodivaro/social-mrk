import axios from 'axios';
import { store } from '../redux/store';

const fetchClient = () => {
  const socialMrk = axios.create({
    baseURL: 'http://1fe5e32fd0b2.ngrok.io',
  });

  socialMrk.interceptors.request.use((config) => {
    const token = store.getState().user.token;
    config.headers.Authorization = token ? `token ${token}` : '';
    return config;
  });

  return socialMrk;
};

export default fetchClient();
