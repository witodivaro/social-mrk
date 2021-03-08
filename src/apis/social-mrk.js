import axios from 'axios';
import { store } from '../redux/store';

const fetchClient = () => {
  const socialMrk = axios.create({
    baseURL: 'http://5e326d24b4b1.ngrok.io',
  });

  socialMrk.interceptors.request.use((config) => {
    const token = store.getState().user.token;
    config.headers.Authorization = token ? `token ${token}` : '';
    return config;
  });

  return socialMrk;
};

export default fetchClient();
