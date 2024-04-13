import { Grid } from '@mui/material';
import { useContext } from 'react';

import { MinterNftCard, ProfileBanner } from '@/components';
import { NFT } from '@/constants';
import { SidebarContext } from '@/context';

export const ProfilePage = () => {
  const sidebarContext = useContext(SidebarContext);
  const minterData = sidebarContext.minterData;
  return (
    <div className="gap-5U pb-10U bg-black-gradient flex h-fit min-h-screen w-full flex-col">
      <ProfileBanner minter={minterData!} />
      <div className="px-8U z-10 block w-full">
        <div className="gap-y-5U gap-x-1U tablet:grid-cols-2 tablet-l:grid-cols-3 desktop:grid-cols-4 desktop-l:grid-cols-5 grid justify-center">
          {NFT.map((nft, key) => (
            <Grid key={key} item>
              <MinterNftCard
                name={nft.name}
                username={nft.username}
                url={nft.url}
                price={nft.price}
                mint={nft.mint}
                unmint={nft.unmint}
              />
            </Grid>
          ))}
        </div>
      </div>
    </div>
  );
};
