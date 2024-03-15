import axios from 'axios';

interface Minter {
  id: number;
  username: string;
  email: string;
  password: string;
  uniqueUrl: string;
}

export const createMinter = async (minter: Minter) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/minter`, minter);
  return response.data;
};
/*
interface UpdateLinkMinter {
  id: Minter['id'];
  uniqueUrl: Minter['uniqueUrl'];
}

export const updateLink = async (minter: UpdateLinkMinter) => {
  const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/settings${minter.id}`, {
    uniqueUrl: minter.uniqueUrl,
  });
  return response.data;
};*/
