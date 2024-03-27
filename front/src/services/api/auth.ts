import axios from 'axios';

import { MinterInterface } from '@/interfaces';

interface Login {
  email: string;
  password: string;
}

export const login = async (data: Login) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, data, {
    withCredentials: true,
  });
};

export const connectedMinter = async () => {
  const minter = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
    withCredentials: true,
  });
  return minter.data as MinterInterface;
};

export const confirm = async (token: string) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/confirm`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
