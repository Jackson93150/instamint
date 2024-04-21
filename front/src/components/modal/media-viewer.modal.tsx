import { LinearProgress } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';

import { handleMint, handleSave } from './modal-actions';
import { CountrySelectInput, ModalTextArea, ModalTextInput, TagInput } from './modal-inputs';
import { NftCardScene } from '../threejs/nft-card';
import { SidebarContext, useAlert, useModal } from '@/context';
import { DraftInterface } from '@/interfaces';
import { createNft, getTotalNft } from '@/services/api/nft';
import { Button } from '@/ui';

interface Props {
  url: string;
  mediaType: 'video' | 'image' | 'audio';
  content: number;
  type?: 'content' | 'draft';
  data?: DraftInterface;
}

export const MediaViewerModal = ({ url, mediaType, content, type = 'content', data }: Props) => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const { closeModal } = useModal();
  const { toggleAlert } = useAlert();
  const sidebarContext = useContext(SidebarContext);
  const minterData = sidebarContext.minterData;
  const { data: hash, isPending, writeContract } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    data: transactionData,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const dataHashtags = data?.hashtag
    ? data.hashtag.split(',').map((item) => (item.trim().startsWith('#') ? item.trim() : '#' + item.trim()))
    : [];

  const createNFT = async () => {
    const count = await getTotalNft();
    const tokenId = parseInt(transactionData?.logs[3].data ? transactionData?.logs[3].data : '', 16);
    if (minterData && data && hash && address) {
      await createNft({
        txHash: hash,
        minterAddress: address,
        name: `${name} #${count}`,
        url: url,
        type: data.content.type,
        location: location,
        listed: false,
        minter: minterData.id,
        description: description,
        hashtag: hashtags.join(','),
        tokenId: tokenId,
      });
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      toggleAlert({
        alertType: 'success',
        content: `Your Nft as been minted. Transaction Hash: ${hash}`,
      });
      closeModal();
      createNFT();
    }
    if (data) {
      setName(data.name);
      setHashtags(dataHashtags);
      setDescription(data?.description ? data.description : '');
      setLocation(data.location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isConfirmed]);

  const MemoizedBubbles = useMemo(() => memo(NftCardScene), []);

  return (
    <div className="gap-5U mobile:flex-row mobile:w-fit mobile:h-[70vh] flex h-[80vh] w-[85vw] flex-col overflow-y-scroll">
      <div className="mobile:w-[40vw] mobile:h-[70vh] relative flex h-[60vh] w-[85vw]">
        <MemoizedBubbles url={url} mediaType={mediaType} />
        {mediaType === 'audio' && (
          <div className="p-2U bottom-5U absolute left-[5%] w-[90%] rounded-[10px] bg-white/30 backdrop-blur-[15px]">
            <audio controls className="w-full">
              <source src={url} type="audio/ogg" />
            </audio>
          </div>
        )}
      </div>
      <div className="mobile:gap-4U gap-6U mobile:w-[40vw] mobile:h-[70vh] flex h-fit w-[85vw] flex-col justify-between">
        <div className="gap-4U flex flex-col">
          <ModalTextInput title="Name" placeholder="Write your NFT Name" name={name} setName={setName} />
          <ModalTextArea
            title="Description"
            placeholder="Write your description here..."
            name={description}
            setName={setDescription}
          />
          <TagInput
            hashtags={hashtags}
            setHashtags={setHashtags}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          <CountrySelectInput location={location} setLocation={setLocation} />
        </div>
        <div className="flex h-fit w-full items-center justify-between">
          <Button
            color="transparent"
            content="Save"
            onClick={() =>
              handleSave({
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
              })
            }
          />
          {type === 'draft' && (
            <Button
              color="green"
              content="Mint"
              onClick={() => {
                if (!address && openConnectModal) {
                  openConnectModal();
                } else {
                  handleMint({ closeModal, toggleAlert, data, name, description, content, url, writeContract });
                }
              }}
              isDisabled={!name || !description || !location || !hashtags}
            />
          )}
        </div>
        {(isConfirming || isPending) && <LinearProgress color="success" />}
      </div>
    </div>
  );
};
