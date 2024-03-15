import axios from 'axios';

interface MinterRegister {
  username: string;
  email: string;
  password: string;
}

export const createMinter = async (minter: MinterRegister) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/minter`, minter);
  return response.data;
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
