import axios from 'axios';

interface Login {
  email: string;
  password: string;
}

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

export const login = async (data: Login) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, data, {
    withCredentials: true,
  });
};

export const connectedMinter = async () => {
  const minter = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
    withCredentials: true,
  });
  return minter;
};

export const confirm = async (token: string) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/confirm`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
