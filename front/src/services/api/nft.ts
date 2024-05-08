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

export const getNftByTokenId = async (tokenId: number) => {
  const nfts = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/nft/token/${tokenId}`);
  return nfts.data;
};

interface UpdateNftList {
  id: number;
  price: number;
  listed: boolean;
}

export const updateNftList = async (data: UpdateNftList) => {
  await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/nft/list`, data, {
    withCredentials: true,
  });
};

interface UpdateNftMinter {
  tokenId: number;
  minterAddress: string;
  minter: number;
}

export const updateNftMinter = async (data: UpdateNftMinter) => {
  await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/nft/minter`, data, {
    withCredentials: true,
  });
};
