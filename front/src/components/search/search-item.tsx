import cx from 'classnames';
import { useNavigate } from 'react-router-dom';

import LogoSmall from '@/assets/logo-small.png';
import { SearchOutput } from '@/interfaces';

export const SearchItem = ({ minter }: { minter: SearchOutput }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-search-gradient hover:bg-green-card-gradient gap-2U relative flex w-full cursor-pointer items-center rounded-[10px] border border-white/20 p-2"
      onClick={() => navigate(`/minter/${minter.uniqueUrl}`)}
    >
      <div className="size-17U flex items-center justify-center overflow-hidden rounded-full bg-green-300 object-cover">
        <img
          className={cx(minter.pictureUrl ? 'size-full' : 'w-auto h-12U')}
          src={minter.pictureUrl ? minter.pictureUrl : LogoSmall}
          alt={`Avatar of ${minter.username}`}
        />
      </div>

      <div className="-mt-2U flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="text-[20px] font-medium text-white">@{minter.username}</div>
          <p className="top-2U right-5U absolute text-[16px] italic text-white/70">
            {minter.isPrivate ? 'private' : 'public'}
          </p>
        </div>
        <div className="flex flex-row gap-[16px]">
          <div className="flex flex-col">
            <p className="text-[16px] font-light italic leading-none text-white">Followers</p>
            <p className="font-think text-[14px] italic leading-none text-white/70">{minter.followerCount}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[16px] font-light italic leading-none text-white">Followed</p>
            <p className="font-think text-[14px] italic leading-none text-white/70">{minter.followedCount}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[16px] font-light italic leading-none text-white">NFT</p>
            <p className="font-think text-[14px] italic leading-none text-white/70">{minter.nftCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
