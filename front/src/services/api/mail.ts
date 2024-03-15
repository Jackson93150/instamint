import axios from 'axios';

interface Email {
  email: string;
}

export const sendVerificationMail = async (email: Email) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/mail/send`, email);
  return response.data;
};
