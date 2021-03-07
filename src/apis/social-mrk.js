import axios from 'axios';
import { store } from '../redux/store';

const fetchClient = () => {
  const socialMrk = axios.create({
    baseURL: 'http://affb92f898ea.ngrok.io',
  });

  socialMrk.interceptors.request.use((config) => {
    const token = store.getState().user.token;
    config.headers.Authorization = token ? `token ${token}` : '';
    return config;
  });

  return socialMrk;
};

export default fetchClient();
