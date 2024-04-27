import { memo, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import EtherLogo from '@/assets/icons/ether.png';
import Music from '@/assets/mock/music.jpeg';
import { PriceCharts } from '@/components';
import { NftCardScene } from '@/components/threejs/nft-card';
import { CHART_DATA } from '@/constants';
import { NftInterface } from '@/interfaces/nft.interface';
import { getNftByTokenId } from '@/services/api/nft';
import { Button, Chip } from '@/ui';
import { Mint } from '@/ui/buttons/mint';
import { formatType } from '@/utils';

export const NftPage = () => {
  const { tokenId } = useParams();
  const [nft, setNft] = useState<NftInterface | null>();
  const [changeView, setChangeView] = useState(false);

  const MemoizedNftScene = useMemo(() => memo(NftCardScene), []);

  useEffect(() => {
    const fetchData = async () => {
      if (tokenId) {
        const data = await getNftByTokenId(parseInt(tokenId));
        setNft(data);
      }
    };
    fetchData();
  }, [tokenId]);

  return (
    nft && (
      <div className="bg-page-gradient px-10U flex h-fit min-h-screen w-full flex-col items-center gap-[32px] pb-[100px] pt-[120px]">
        <span className="tablet:size-[500px] absolute left-[-450px] top-[-400px] size-[300px] rounded-full bg-green-400 blur-[450px]" />
        <div className="gap-5U tablet:flex-row flex h-fit w-full flex-col">
          <div className="bg-green-card-gradient p-4U gap-2U ease desktop-s:w-full desktop-s:max-w-[600px] tablet:w-[45vw] group relative z-10 flex aspect-square w-full justify-center overflow-hidden rounded-[10px] border border-white/50 transition-all duration-300">
            <div
              className="top-8U right-8U px-2U py-1U absolute z-10 cursor-pointer rounded-full border-white/50 bg-black/50 text-white backdrop-blur-xl"
              onClick={() => setChangeView(!changeView)}
            >
              3D View
            </div>
            {changeView ? (
              <>
                <MemoizedNftScene url={nft.url} mediaType={formatType(nft.type)} />
                {formatType(nft.type) === 'audio' && (
                  <div className="p-2U bottom-7U absolute left-[5%] w-[90%] rounded-[10px] bg-white/30 backdrop-blur-[15px]">
                    <audio controls className="w-full">
                      <source src={nft.url} type="audio/ogg" />
                    </audio>
                  </div>
                )}
              </>
            ) : (
              <>
                {nft.type.startsWith('audio/') ? (
                  <>
                    <img src={Music} alt={nft.url} loading="lazy" className="ease rounded-[10px]" />
                    <div className="p-2U bottom-7U absolute left-[5%] w-[90%] rounded-[10px] bg-white/30 backdrop-blur-[15px]">
                      <audio controls className="w-full">
                        <source src={nft.url} type="audio/ogg" />
                      </audio>
                    </div>
                  </>
                ) : nft?.type.startsWith('video/') ? (
                  <video autoPlay muted loop preload="metadata" className="ease rounded-[10px]">
                    <source src={`${nft.url}`} type={nft.type} />
                  </video>
                ) : (
                  <img src={nft.url} alt={nft.url} loading="lazy" className="ease rounded-[10px]" />
                )}
              </>
            )}
          </div>
          <div className="p-3U tablet:px-8U gap-2U ease tablet:aspect-auto tablet:grow group z-10 flex aspect-square flex-col overflow-hidden rounded-[10px] border border-white/25 bg-[#012923]/30 transition-all duration-300">
            <div className="flex h-[200px] w-full flex-col">
              <div className="flex w-full items-center justify-between">
                <div className="gap-2U flex items-center">
                  <span className="text-[20px] font-thin text-white/80">owned by</span>
                  {nft.minter.pictureUrl ? (
                    <div className="flex items-center">
                      <img
                        src={nft.minter.pictureUrl}
                        alt="pp"
                        loading="lazy"
                        className="ease size-4U rounded-full border border-white/25"
                      />
                      <span className="text-[20px] font-thin italic text-white">{nft.minter.username}</span>
                    </div>
                  ) : (
                    <span className="text-[20px] font-thin italic text-white">{nft.minter.username}</span>
                  )}
                </div>
                <div className="gap-1U flex items-center">
                  <Mint value={0} type="mint" />
                  <Mint value={0} type="unmint" />
                </div>
              </div>
              <span className="text-[48px] font-bold text-white">{nft.name}</span>
              <div className="gap-2U flex">
                {nft.hashtag?.split(',').map((tag, key) => {
                  return <Chip key={key} text={tag} />;
                })}
              </div>
            </div>
            <div className="px-4U pt-3U flex size-full flex-col rounded-[25px] bg-black/25">
              <div className="px-7U gap-2U pt-2U pb-4U flex h-fit w-full flex-col">
                <span className="text-[16px] font-semibold text-[#828282]">Current Price</span>
                <div className="gap-2U flex items-center">
                  <img className="h-[30px]" src={EtherLogo} alt="ether" />
                  <span className="text-[24px] font-bold text-white">{nft.price ? nft.price : '--'} ETH</span>
                </div>
              </div>
              <div className="flex h-1/2 w-full flex-col">
                <PriceCharts data={CHART_DATA} />
              </div>
              <div className="px-7U pt-4U">
                <Button color="green" content="BUY" fullWidth />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2U text-body h-fit w-full rounded-[10px] border border-white/25 bg-[#012923]/30 text-white/80">
          {nft.minter.bio}
        </div>
      </div>
    )
  );
};
