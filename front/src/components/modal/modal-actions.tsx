import { Dispatch } from 'react';
import { Config } from 'wagmi';
import { WriteContractMutate } from 'wagmi/query';

import { ABI, LIST_NFT_ABI, MARKETPLACE_CONTRACT, NFT_CONTRACT } from '@/constants';
import { ToggleAlertArgs } from '@/context';
import { DraftInterface, MinterInterface } from '@/interfaces';
import { createDraft, updateDraft, uploadFirebase } from '@/services';
import { getTotalNft } from '@/services/api/nft';
import { ethToWeiConverter } from '@/utils';

interface SaveProps {
  minterData: MinterInterface | null;
  closeModal: () => void;
  toggleAlert: Dispatch<ToggleAlertArgs>;
  type: 'content' | 'draft';
  data: DraftInterface | undefined;
  name: string;
  description: string;
  location: string;
  hashtags: string[];
  content: number;
}

export interface MintProps {
  closeModal: () => void;
  toggleAlert: Dispatch<ToggleAlertArgs>;
  data: DraftInterface | undefined;
  name: string;
  description: string;
  content: number;
  url: string;
  writeContract: WriteContractMutate<Config, unknown>;
}

export interface ListProps {
  closeModal: () => void;
  toggleAlert: Dispatch<ToggleAlertArgs>;
  tokenId: number;
  price: number;
  writeContract: WriteContractMutate<Config, unknown>;
}

export const handleSave = async ({
  minterData,
  closeModal,
  toggleAlert,
  type,
  data,
  name,
  description,
  location,
  hashtags,
  content,
}: SaveProps) => {
  if (location && minterData) {
    const draft = {
      name: name,
      description: description,
      author: minterData?.username,
      hashtag: hashtags.join(','),
      location: location,
      minter: minterData?.id,
      content: content,
    };
    try {
      if (type === 'draft' && data) {
        await updateDraft(data?.id, draft);
      } else {
        await createDraft(draft);
      }
      toggleAlert({
        alertType: 'success',
        content: 'Your draft as been saved.',
      });
      closeModal();
    } catch (error) {
      toggleAlert({
        alertType: 'error',
        content: error as string,
      });
      closeModal();
    }
  } else {
    toggleAlert({
      alertType: 'error',
      content: 'You have to fill all the required field.',
    });
  }
};

export const handleMint = async ({
  closeModal,
  toggleAlert,
  data,
  name,
  description,
  content,
  url,
  writeContract,
}: MintProps) => {
  const count = await getTotalNft();
  const nft = {
    name: `${name} #${count}`,
    description: description,
    image: url,
  };
  const nftBlob = new Blob([JSON.stringify(nft)], { type: 'application/json' });
  const nftFile = new File([nftBlob], `nft-${content}-${data?.id}.json`, { type: 'application/json' });
  try {
    const firebaseUrl = await uploadFirebase(nftFile);
    writeContract({
      address: NFT_CONTRACT,
      abi: ABI,
      functionName: 'mint',
      args: [firebaseUrl],
    });
  } catch (error) {
    toggleAlert({
      alertType: 'error',
      content: error as string,
    });
    closeModal();
  }
};

export const handleListing = async ({ closeModal, toggleAlert, tokenId, price, writeContract }: ListProps) => {
  try {
    writeContract({
      address: MARKETPLACE_CONTRACT,
      abi: LIST_NFT_ABI,
      functionName: 'listNft',
      value: BigInt(100000000000000),
      args: [NFT_CONTRACT, BigInt(tokenId), ethToWeiConverter(price)],
    });
  } catch (error) {
    toggleAlert({
      alertType: 'error',
      content: error as string,
    });
    closeModal();
  }
};
