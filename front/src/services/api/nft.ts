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
  const total = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/nft/count`);
  return total.data;
};

export const createNft = async (data: Nft) => {
  await axios.post(`${import.meta.env.VITE_BACKEND_URL}/nft`, data, {
    withCredentials: true,
  });
};

export const getNftByAddress = async (address: string) => {
  const nfts = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/nft/address/${address}`);
  return nfts.data;
};

export const getNftByMinter = async (minterId: number) => {
  const nfts = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/nft/id/${minterId}`);
  return nfts.data;
};
