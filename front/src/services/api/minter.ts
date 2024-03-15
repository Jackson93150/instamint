import axios from 'axios';

export interface Minter {
  id: number;
  username: string;
  email: string;
  password: string;
  phone?: string | null;
  bio?: string | null;
  pictureUrl?: string | null;
  uniqueUrl?: string | null;
  isPrivate: boolean;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const createMinter = async (minter: Minter) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/minter`, minter);
  return response.data;
};

export const connectedMinter = async () => {
  const minter = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
    withCredentials: true,
  });
  return minter;
};

export const updateUniqueUrl = async (uniqueUrl: string) => {
  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/minter/unique-url`),
    {
      uniqueUrl,
    },
    {
      withCredentials: true,
    };
};
