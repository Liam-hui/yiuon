import axios from 'axios';
import storage from '@/utils/storage';

const api = axios.create({
  baseURL: 'http://yiuonapp.itisdemo.com/api/',
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();

  const headers = { ...config.headers };

  if (token) {
    // console.log(token);
    headers.Authorization = `Bearer ${token}`;
  }

  return { ...config, headers };
});

export default api;
