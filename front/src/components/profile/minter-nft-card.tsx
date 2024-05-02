import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import EtherLogo from '@/assets/icons/ether.png';
import Music from '@/assets/mock/music.jpeg';
import { SidebarContext, useModal } from '@/context';
import { NftInterface } from '@/interfaces/nft.interface';
import { Button } from '@/ui';
import { Mint } from '@/ui/buttons/mint';

interface Props {
  nft: NftInterface;
  username: string;
  isMe: boolean;
}

export const MinterNftCard = ({ nft, username, isMe }: Props) => {
  const navigate = useNavigate();
  const sidebarContext = useContext(SidebarContext);
  const { toggleModal } = useModal();

  return (
    <div className="bg-green-card-gradient p-3U gap-2U ease group z-10 flex h-fit min-w-[340px] max-w-[370px] flex-col overflow-hidden rounded-[10px] border border-white/50 transition-all duration-300 hover:shadow-2xl">
      <div
        className="aspect-square w-full cursor-pointer overflow-hidden rounded-[10px]"
        onClick={() => navigate(`/nft/${nft.tokenId}`)}
      >
        {nft.type.startsWith('audio/') ? (
          <img
            src={Music}
            alt={nft.url}
            loading="lazy"
            className="ease transition-all duration-500 group-hover:scale-110"
          />
        ) : nft.type.startsWith('video/') ? (
          <video
            autoPlay
            muted
            loop
            preload="metadata"
            className="ease transition-all duration-500 group-hover:scale-110"
          >
            <source src={`${nft.url}`} type={nft.type} />
          </video>
        ) : (
          <img
            src={`${nft.url}`}
            alt={nft.url}
            loading="lazy"
            className="ease transition-all duration-500 group-hover:scale-110"
          />
        )}
      </div>
      <div className="h-20U px-3U py-2U relative flex w-full justify-between overflow-hidden rounded-[10px] border border-white/25 bg-black/25 backdrop-blur-[25px]">
        <div className="gap-2U flex flex-col">
          <div className="gap-1U flex flex-col">
            <div className="flex">
              <span className="w-[200px] truncate text-[16px] font-bold leading-none text-white">{nft.name}</span>
            </div>
            <span className="text-small leading-none text-white">{username}</span>
          </div>
          {nft.price && (
            <div className="gap-1U flex items-center">
              <img className="h-[25px]" src={EtherLogo} alt="ether" />
              <span className="text-heading leading-none text-white">
                {typeof nft.price === 'number' ? nft.price.toFixed(2) : parseFloat(nft.price).toFixed(2)}
              </span>
            </div>
          )}
        </div>
        <div className="gap-1U mt-[-2px] flex shrink-0">
          <Mint nft={nft} minterId={sidebarContext.minterData?.id} />
        </div>

        <div className="bottom-2U right-3U ease absolute translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {isMe ? (
            <Button
              color="green"
              content="LIST"
              size="small"
              isDisabled={nft.listed}
              onClick={() => {
                toggleModal({
                  modalType: 'list-nft',
                  data: { nft: nft, actionType: 'list' },
                });
              }}
            />
          ) : (
            <Button
              color="green"
              content="BUY"
              size="small"
              isDisabled={!nft.listed}
              onClick={() => {
                toggleModal({
                  modalType: 'list-nft',
                  data: { nft: nft, actionType: 'buy' },
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
