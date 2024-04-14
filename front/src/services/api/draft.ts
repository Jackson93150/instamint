import axios from 'axios';

import { DraftInterface } from '@/interfaces';

export interface Draft {
  description?: string;
  author: string;
  hashtag?: string;
  location: string;
  minter: number;
  content: number;
}

export const createDraft = async (data: Draft) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/draft`, data, {
    withCredentials: true,
  });
};

export const getDrafts = async () => {
  const contents = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/draft/minter`, {
    withCredentials: true,
  });
  return contents.data as DraftInterface[];
};
