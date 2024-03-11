import axios from 'axios';

interface Login {
  email: string;
  password: string;
}

export const login = async (data: Login) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, data, {
    withCredentials: true,
  });
};
