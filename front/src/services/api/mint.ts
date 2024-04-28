import axios from 'axios';

import { MintInterface } from '@/interfaces';

interface Mint {
  mint: boolean;
  minterId: number;
  nftId: number;
}

export const createOrUpdateMint = async (data: Mint) => {
  const mint = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/mint`, data, {
    withCredentials: true,
  });

  return mint.data;
};

interface GetMint {
  nft: number;
  mint: boolean;
}

export const getMints = async ({ nft, mint }: GetMint) => {
  const contents = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/mint/nft/${nft}/${mint}`, {
    withCredentials: true,
  });
  return contents.data as MintInterface[];
};

interface GetMintStatus {
  nft: number;
  minter: number;
}

export const getMintStatus = async ({ nft, minter }: GetMintStatus) => {
  const contents = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/mint/mint/${nft}/${minter}`, {
    withCredentials: true,
  });
  return contents.data as boolean | null;
};
