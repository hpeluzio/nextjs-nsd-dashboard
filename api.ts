'use client';

import axios from 'axios';
import { store } from '@/app/redux/store';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 25000,
});

instance.defaults.headers['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const isLogin = await state.auth.isLogin;

    if (isLogin) {
      config.headers.Authorization = `bearer ${await state.auth.currentUser.access_token}`;
    }

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default instance;
