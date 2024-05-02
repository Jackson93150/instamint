import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ChangeEvent, useState } from 'react';
import { useAccount } from 'wagmi';

import { useAlert, useModal, useNft } from '@/context';
import { NftInterface } from '@/interfaces/nft.interface';
import { Button } from '@/ui';

interface Props {
  nft: NftInterface;
}

export const ListNftModal = ({ nft }: Props) => {
  const [priceInput, setPriceInput] = useState<string>('');
  const nftContext = useNft();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const { closeModal } = useModal();
  const { toggleAlert } = useAlert();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPriceInput(e.target.value);
  };

  return (
    <div className="p-3U gap-4U relative flex size-fit flex-col items-center justify-center">
      <span className="text-body text-white">List {nft.name}</span>
      <div className="gap-2U flex flex-col">
        <label htmlFor="text" className="ml-1U text-body block text-white/90">
          Price in ETH
        </label>
        <input
          id="text"
          className="p-2U text-body block w-full rounded-[5px] border border-white/50 bg-white/10 text-white/80"
          placeholder="0.0 ETH"
          value={priceInput}
          onChange={handleNameChange}
        />
      </div>
      <Button
        color="green"
        size="large"
        content="List NFT"
        onClick={() => {
          if (!address && openConnectModal) {
            openConnectModal();
          } else {
            if (priceInput && nft) {
              nftContext.handleList({
                closeModal,
                toggleAlert,
                tokenId: nft.id,
                price: parseFloat(priceInput),
              });
            }
          }
        }}
      />
    </div>
  );
};
