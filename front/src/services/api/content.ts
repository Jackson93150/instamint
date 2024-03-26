import axios from 'axios';

import { ContentInterface } from '@/interfaces';

export interface Content {
  name: string;
  url: string;
  type: string;
  minter: number;
}

export const createContent = async (data: Content) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/content`, data, {
    withCredentials: true,
  });
};

export const getContents = async () => {
  const contents = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/content/minter`, {
    withCredentials: true,
  });
  return contents.data as ContentInterface[];
};
