import axios from 'axios';
import { store } from '../redux/store';

const fetchClient = () => {
  const socialMrk = axios.create({
    // baseURL: 'https://3edeeac2dc34.ngrok.io',
    baseURL: 'http://127.0.0.1:8000',
  });

  socialMrk.interceptors.request.use((config) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  });

  return socialMrk;
};

export default fetchClient();
