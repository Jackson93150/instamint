import axios from 'axios';

interface Nft {
  txHash: string;
  tokenId: number;
  minterAddress: string;
  name: string;
  url: string;
  type: string;
  description: string;
  hashtag: string;
  location: string;
  listed: boolean;
  minter: number;
}

export const getTotalNft = async () => {
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/nft/count`);
};

export const createNft = async (data: Nft) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/nft`, data, {
    withCredentials: true,
  });
};
