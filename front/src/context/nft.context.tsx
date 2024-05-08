/* eslint-disable max-lines */
import { createContext, PropsWithChildren, Dispatch, useContext, useEffect, useState } from 'react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { ToggleAlertArgs, useAlert } from './alert.context';
import { handleBuy, handleListing, handleMint } from '@/components/modal/modal-actions';
import { DraftInterface } from '@/interfaces';
import { NftInterface } from '@/interfaces/nft.interface';
import { createNft, getTotalNft, updateNftList, updateNftMinter } from '@/services/api/nft';
import { createTransaction } from '@/services/api/transaction';

export interface HandleMintArgs {
  closeModal: () => void;
  toggleAlert: Dispatch<ToggleAlertArgs>;
  data: DraftInterface | undefined;
  name: string;
  description: string;
  content: number;
  url: string;
  minterAddress: string;
  type: string;
  hashtag: string[];
  location: string;
  listed: boolean;
  minter: number;
}

export interface HandleListArgs {
  closeModal: () => void;
  toggleAlert: Dispatch<ToggleAlertArgs>;
  price: number;
  nft: NftInterface;
}

export interface HandleBuyArgs {
  closeModal: () => void;
  toggleAlert: Dispatch<ToggleAlertArgs>;
  nft: NftInterface;
  minter: number;
  address: string;
}

export type NftContextProps = {
  handleMint: Dispatch<HandleMintArgs>;
  handleList: Dispatch<HandleListArgs>;
  handleBuy: Dispatch<HandleBuyArgs>;
  isSaveLoading: boolean;
  isListLoading: boolean;
  isBuyLoading: boolean;
};

const NftContext = createContext<NftContextProps | undefined>(undefined);

export const NftProvider = ({ children }: PropsWithChildren) => {
  const [mintData, setMintData] = useState<HandleMintArgs>();
  const [listData, setListData] = useState<HandleListArgs>();
  const [buyData, setBuyData] = useState<HandleBuyArgs>();
  const { toggleAlert } = useAlert();
  const { data: hash, writeContract } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: transactionData,
  } = useWaitForTransactionReceipt({
    confirmations: 2,
    hash,
    pollingInterval: 1_000,
  });
  const { data: hashList, writeContract: writeContractList } = useWriteContract();
  const { isLoading: isConfirmingList, isSuccess: isConfirmedList } = useWaitForTransactionReceipt({
    confirmations: 2,
    hash: hashList,
    pollingInterval: 1_000,
  });
  const { data: hashBuy, writeContract: writeContractBuy } = useWriteContract();
  const { isLoading: isConfirmingBuy, isSuccess: isConfirmedBuy } = useWaitForTransactionReceipt({
    confirmations: 2,
    hash: hashBuy,
    pollingInterval: 1_000,
  });

  const handleMintAction = async (args: HandleMintArgs) => {
    const data = { writeContract, ...args };
    setMintData(data);
    await handleMint(data);
  };

  const handleListAction = async (args: HandleListArgs) => {
    const data = { writeContract: writeContractList, ...args };
    setListData(data);
    await handleListing(data);
  };

  const handleBuyAction = async (args: HandleBuyArgs) => {
    const data = { writeContract: writeContractBuy, ...args };
    setBuyData(data);
    await handleBuy(data);
  };

  const saveNft = async () => {
    if (isConfirmed && !isConfirming && mintData) {
      const count = await getTotalNft();
      const tokenId = parseInt(transactionData?.logs[3].data ? transactionData?.logs[3].data : '', 16);
      const nft = {
        txHash: hash as string,
        minterAddress: mintData.minterAddress,
        name: `${mintData.name} #${count}`,
        url: mintData.url,
        type: mintData.type,
        location: mintData.location,
        listed: false,
        minter: mintData.minter,
        description: mintData.description,
        hashtag: mintData.hashtag.join(','),
        tokenId: tokenId,
      };
      createNft(nft)
        .then(() => {
          mintData.closeModal();
          toggleAlert({
            alertType: 'success',
            content: `Your Nft as been minted. Transaction Hash: ${hash}`,
          });
        })
        .catch((error) => {
          toggleAlert({
            alertType: 'error',
            content: `Failed to create NFT on server: ${error}`,
          });
        });
    }
  };

  const saveList = async () => {
    const txType: 'list' | 'buy' = 'list';
    const tx = {
      txHash: hashList as string,
      tokenId: listData!.nft.tokenId,
      from: listData!.nft.minterAddress,
      type: txType,
      price: listData!.price,
      minter: listData!.nft.minter.id,
      nft: listData!.nft.id,
    };
    if (isConfirmedList && !isConfirmingList && listData) {
      createTransaction(tx);
      updateNftList({ id: listData.nft.tokenId, price: listData.price, listed: true })
        .then(() => {
          listData.closeModal();
          toggleAlert({
            alertType: 'success',
            content: `Your Nft as been listed. Transaction Hash: ${hashList}`,
          });
        })
        .catch((error) => {
          toggleAlert({
            alertType: 'error',
            content: `Failed to list NFT on server: ${error}`,
          });
        });
    }
  };

  const saveBuy = async () => {
    const txType: 'list' | 'buy' = 'buy';
    const tx = {
      txHash: hashBuy as string,
      tokenId: buyData!.nft.tokenId,
      from: buyData!.nft.minterAddress,
      to: buyData?.address,
      type: txType,
      price: buyData!.nft.price,
      minter: buyData!.nft.minter.id,
      nft: buyData!.nft.id,
    };
    if (isConfirmedBuy && !isConfirmingBuy && buyData) {
      createTransaction(tx);

      updateNftMinter({ tokenId: buyData.nft.tokenId, minterAddress: buyData.address, minter: buyData.minter })
        .then(() => {
          buyData.closeModal();
          toggleAlert({
            alertType: 'success',
            content: `Your Nft as been purchased. Transaction Hash: ${hashBuy}`,
          });
        })
        .catch((error) => {
          toggleAlert({
            alertType: 'error',
            content: `Failed to purchase NFT on server: ${error}`,
          });
        });
    }
  };

  useEffect(() => {
    saveNft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed, isConfirming]);

  useEffect(() => {
    saveList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmedList, isConfirmingList]);

  useEffect(() => {
    saveBuy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmedBuy, isConfirmingBuy]);

  return (
    <NftContext.Provider
      value={{
        handleMint: (args) => handleMintAction(args as HandleMintArgs),
        handleList: (args) => handleListAction(args as HandleListArgs),
        handleBuy: (args) => handleBuyAction(args as HandleBuyArgs),
        isSaveLoading: isConfirming,
        isListLoading: isConfirmingList,
        isBuyLoading: isConfirmingBuy,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

export const useNft = () => {
  const context = useContext(NftContext);
  if (context === undefined) {
    throw new Error('useNft must be used within a NftProvider');
  }
  return context;
};
