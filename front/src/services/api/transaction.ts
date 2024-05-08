import axios from 'axios';

import { ChartData } from '@/interfaces';

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

export const getTransactionPrices = async (tokenId: number) => {
  const tx = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/transaction/prices/${tokenId}`);
  return tx.data as ChartData[];
};
