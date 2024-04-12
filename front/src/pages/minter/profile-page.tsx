import { Grid } from '@mui/material';

import { MinterNftCard, ProfileBanner } from '@/components';
import { NFT } from '@/constants';

export const ProfilePage = () => {
  return (
    <div className="gap-5U pb-10U flex h-fit min-h-screen w-full flex-col bg-black">
      <ProfileBanner />
      <div className="px-10U z-10 block w-full">
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
