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

interface MinterChangeUniqueUrl {
  uniqueUrl: string;
}

export const updateUniqueUrl = async (data: MinterChangeUniqueUrl) => {
  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/minter/unique-url`, data, {
    withCredentials: true,
  });
};

export const deleteMinter = async () => {
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/minter`, {
    withCredentials: true,
  });
};
