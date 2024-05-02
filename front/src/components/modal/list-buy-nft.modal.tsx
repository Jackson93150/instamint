import { LinearProgress } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ChangeEvent, memo, useContext, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';

import { NftCardScene } from '../threejs/nft-card';
import { SidebarContext, useAlert, useModal, useNft } from '@/context';
import { NftInterface } from '@/interfaces/nft.interface';
import { Button } from '@/ui';
import { formatType } from '@/utils';

interface Props {
  nft: NftInterface;
  actionType: 'list' | 'buy';
}

export const ListBuyNftModal = ({ nft, actionType }: Props) => {
  const [priceInput, setPriceInput] = useState<string>('');
  const nftContext = useNft();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const { closeModal } = useModal();
  const { toggleAlert } = useAlert();
  const sidebarContext = useContext(SidebarContext);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (input.toString().length <= 6) {
      setPriceInput(input);
    }
  };

  const MemoizedNftScene = useMemo(() => memo(NftCardScene), []);

  return (
    <div className="p-3U gap-4U relative flex size-fit flex-col items-center justify-center">
      <div className="mobile:size-[500px] flex h-[500px] w-[80vw] rounded-[25px]">
        <MemoizedNftScene url={nft.url} mediaType={formatType(nft.type)} />
      </div>
      {actionType === 'list' && (
        <>
          <div className="gap-2U flex w-full flex-col">
            <label htmlFor="text" className="ml-1U text-body block text-white/90">
              Price in ETH
            </label>
            <input
              type="number"
              id="text"
              className="p-2U text-body block w-full rounded-[5px] border border-white/50 bg-white/10 text-white/80"
              placeholder="0.0 ETH"
              value={priceInput}
              onChange={handleNameChange}
            />
          </div>
          <div className="gap-2U flex w-full flex-col">
            <Button
              color="green"
              size="large"
              content="List NFT"
              fullWidth
              onClick={() => {
                if (!address && openConnectModal) {
                  openConnectModal();
                } else {
                  if (priceInput && nft) {
                    nftContext.handleList({
                      closeModal,
                      toggleAlert,
                      price: parseFloat(priceInput),
                      nft: nft,
                    });
                  }
                }
              }}
            />
            {nftContext.isListLoading && <LinearProgress color="success" />}
          </div>
        </>
      )}
      {actionType === 'buy' && (
        <div className="gap-2U flex w-full flex-col">
          <Button
            color="green"
            size="large"
            content="Buy NFT"
            fullWidth
            onClick={() => {
              if (!address && openConnectModal) {
                openConnectModal();
              } else {
                if (nft) {
                  nftContext.handleBuy({
                    closeModal,
                    toggleAlert,
                    nft: nft,
                    minter: sidebarContext.minterData!.id,
                    address: address as string,
                  });
                }
              }
            }}
          />
          {nftContext.isBuyLoading && <LinearProgress color="success" />}
        </div>
      )}
    </div>
  );
};
