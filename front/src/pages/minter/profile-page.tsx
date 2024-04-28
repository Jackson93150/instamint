import { Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { MinterNftCard, ProfileBanner } from '@/components';
import { SidebarContext } from '@/context';
import { MinterInterface } from '@/interfaces';
import { NftInterface } from '@/interfaces/nft.interface';
import { getMinterByUrl } from '@/services';
import { getNftByAddress, getNftByMinter } from '@/services/api/nft';

export const ProfilePage = () => {
  const [minter, setMinter] = useState<MinterInterface | null>(null);
  const [nft, setNft] = useState<NftInterface[] | null>();
  const sidebarContext = useContext(SidebarContext);
  const location = useLocation();
  const { uniqueUrl } = useParams();
  const { address } = useAccount();

  useEffect(() => {
    const fetchMinterByUrl = async () => {
      const minterProfile = await getMinterByUrl(uniqueUrl!);
      setMinter(minterProfile);
      if (minterProfile) {
        const minterNft = await getNftByMinter(minterProfile.id);
        setNft(minterNft);
      }
    };

    const fetchMinterNftByAddress = async (address: string) => {
      const minterNft = await getNftByAddress(address);
      setNft(minterNft);
    };
    if (location.pathname === '/me') {
      setMinter(sidebarContext.minterData);
      if (address) {
        fetchMinterNftByAddress(address);
      }
    } else {
      fetchMinterByUrl();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, uniqueUrl, sidebarContext.minterData, address]);
  return (
    minter && (
      <div className="gap-5U pb-10U bg-black-gradient flex h-fit min-h-screen w-full flex-col">
        <ProfileBanner minter={minter!} nfts={nft ? nft.length : 0} />
        {minter?.bio && (
          <div className="p-2U bg-green-bio-gradient tablet-l:hidden ml-[5vw] flex w-[90vw] rounded-[10px] border border-white/25 backdrop-blur-2xl">
            <p className="text-[12px] text-white">{minter.bio}</p>
          </div>
        )}
        <div className="px-8U z-10 block w-full">
          <div className="gap-y-5U gap-x-1U tablet:grid-cols-2 tablet-l:grid-cols-3 desktop:grid-cols-4 desktop-l:grid-cols-5 grid justify-center">
            {nft &&
              nft.map((nft, key) => (
                <Grid key={key} item>
                  <MinterNftCard nft={nft} username={minter?.username} />
                </Grid>
              ))}
          </div>
        </div>
      </div>
    )
  );
};
