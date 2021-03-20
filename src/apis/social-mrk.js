import axios from "axios";
import { store } from "../redux/store";

const fetchClient = () => {
  const socialMrk = axios.create({
    baseURL: "https://5f46dbea9264.ngrok.io",
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
