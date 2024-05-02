import axios from 'axios';

interface Transaction {
  txHash: string;
  tokenId: number;
  from: string;
  to?: string;
  type: 'list' | 'buy';
  price?: number;
  minter: number;
  nft: number;
}

export const createTransaction = async (data: Transaction) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/transaction`, data, {
    withCredentials: true,
  });
};
