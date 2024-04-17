import axios from 'axios';

import { MinterInterface } from '@/interfaces';

interface MinterRegister {
  username: string;
  email: string;
  password: string;
}

export const createMinter = async (minter: MinterRegister) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/minter`, minter);
  return response.data;
};

interface MinterChangeUniqueUrl {
  uniqueUrl: string;
}

export const updateUniqueUrl = async (data: MinterChangeUniqueUrl) => {
  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/minter/unique-url`, data, {
    withCredentials: true,
  });
};

export const getMinterByUrl = async (uniqueUrl: string) => {
  const followers = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/minter/url/${uniqueUrl}`, {
    withCredentials: true,
  });
  return followers.data as MinterInterface;
};

export const deleteMinter = async () => {
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/minter`, {
    withCredentials: true,
  });
};

interface MinterChangeUsername {
  username: string;
}

export const updateUsername = async (data: MinterChangeUsername) => {
  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/minter/username`, data, {
    withCredentials: true,
  });
};
