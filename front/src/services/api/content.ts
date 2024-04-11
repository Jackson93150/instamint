import axios from 'axios';

import { ContentInterface } from '@/interfaces';

export interface Content {
  name: string;
  url: string;
  type: string;
  minter: number;
}

export const uploadFirebase = async (file: File) => {
  const formData = new FormData();
  const encodedFilename = encodeURIComponent(file.name);
  formData.append('file', file, encodedFilename);
  const firebaseUrl = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/content/firebase`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return firebaseUrl.data;
};

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

export const deleteContent = async (name: string) => {
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/content/firebase/${name}`, {
    withCredentials: true,
  });
};
