import { createContext, PropsWithChildren, Dispatch, useContext, useEffect, useState } from 'react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { ToggleAlertArgs, useAlert } from './alert.context';
import { handleMint } from '@/components/modal/modal-actions';
import { DraftInterface } from '@/interfaces';
import { createNft, getTotalNft } from '@/services/api/nft';

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

export type NftContextProps = {
  handleMint: Dispatch<HandleMintArgs>;
  isLoading: boolean;
};

const NftContext = createContext<NftContextProps | undefined>(undefined);

export const NftProvider = ({ children }: PropsWithChildren) => {
  const [mintData, setMintData] = useState<HandleMintArgs>();
  const { toggleAlert } = useAlert();
  const { data: hash, writeContract } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: transactionData,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleMintAction = async (args: HandleMintArgs) => {
    const data = { writeContract, ...args };
    setMintData(data);
    await handleMint(data);
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

  useEffect(() => {
    saveNft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed, isConfirming]);

  return (
    <NftContext.Provider
      value={{
        handleMint: (args) => handleMintAction(args as HandleMintArgs),
        isLoading: isConfirming,
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
