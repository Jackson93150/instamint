import axios from 'axios';

interface Minter {
  username: string;
  email: string;
  password: string;
}

interface MinterProfile {
  username: string;
  email: string;
}

interface UpdatePasswordMinter {
  oldPassword: string;
  newPassword: string;
}

export const createMinter = async (minter: Minter) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/minter`, minter);
  return response.data;
};

export const getUserProfile = async (): Promise<MinterProfile> => {
  const response = await axios.get<{ username: string; email: string }>(
    `${import.meta.env.VITE_BACKEND_URL}/minter/profile`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const updatePassword = async (data: UpdatePasswordMinter) => {
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/minter/changePassword`, data, {
    withCredentials: true,
  });
  return response.data;
};
