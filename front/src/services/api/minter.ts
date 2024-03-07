import axios from 'axios';

interface Minter {
  username: string;
  email: string;
  password: string;
}

export const createMinter = async (minter: Minter) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/minter`, minter);
  return response.data;
};
