import axios from 'axios';
import { store } from '../redux/store';

export let baseURL = 'https://d0596f3437a6.ngrok.io';

const fetchClient = () => {
  const socialMrk = axios.create({
    baseURL,
    // baseURL: 'http://127.0.0.1:8000',
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
