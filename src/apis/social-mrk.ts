import axios from 'axios';
import { store } from '../redux/store';

const fetchClient = () => {
  const socialMrk = axios.create({
    baseURL: 'https://d1821b0f8417.ngrok.io',
  });

  socialMrk.interceptors.request.use((config) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `token ${token}`;
    }

    return config;
  });

  return socialMrk;
};

export default fetchClient();
