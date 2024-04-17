import { useEffect, useState } from 'react';

import ProfilePicture from '@/assets/icons/pp.svg?react';
import { FollowInterface, MinterInterface } from '@/interfaces';
import { getFollowed, getFollowers } from '@/services';
import { formatThousand } from '@/utils';

interface Props {
  minter: MinterInterface;
}

export const ProfileBanner = ({ minter }: Props) => {
  const [followers, setFollowers] = useState<FollowInterface[]>([]);
  const [followed, setFollowed] = useState<FollowInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allFollowers = await getFollowers(minter.id);
      const allFollowed = await getFollowed(minter.id);
      setFollowers(allFollowers);
      setFollowed(allFollowed);
    };
    fetchData();
  });
  return (
    minter && (
      <div className="relative z-10 h-[35vh] w-full">
        <img
          className="size-full object-cover"
          src="https://nationaljeweler.com/uploads/384f44178410d337518d2112726a79c6.jpg"
          alt="banner"
        />
        <span className="tablet:shadow-[inset_0_-40px_300px_100px_rgba(0,0,0,1)] pointer-events-none absolute left-0 top-0 h-[35vh] w-full shadow-[inset_0_-40px_300px_50px_rgba(0,0,0,1)]" />
        <div className="px-8U gap-4U absolute bottom-0 left-0 flex h-fit w-full">
          {minter.pictureUrl ? (
            <div className="size-[125px] overflow-hidden rounded-full">
              <img className="size-full object-cover" src={minter.pictureUrl} alt="pp" />
            </div>
          ) : (
            <ProfilePicture className="size-[125px]" />
          )}
          <div className="gap-3U flex flex-col">
            <span className="text-[32px] font-semibold leading-none text-white">@{minter.username}</span>
            <div className="ml-1U flex items-center">
              <div className="gap-1U pr-4U flex flex-col border-r">
                <span className="text-heading leading-none text-white">Followers</span>
                <span className="text-subheading leading-none text-white">{formatThousand(followers.length)}</span>
              </div>
              <div className="gap-1U px-4U flex flex-col border-r">
                <span className="text-heading leading-none text-white">Followed</span>
                <span className="text-subheading leading-none text-white">{formatThousand(followed.length)}</span>
              </div>
              <div className="gap-1U pl-4U flex flex-col">
                <span className="text-heading leading-none text-white">NFT</span>
                <span className="text-subheading leading-none text-white">412</span>
              </div>
            </div>
          </div>
        </div>
        {minter.bio && (
          <div className="p-2U bg-green-bio-gradient bottom-4U right-10U absolute flex w-[420px] rounded-[10px] border border-white/25 backdrop-blur-2xl">
            <p className="text-[12px] text-white">{minter.bio}</p>
          </div>
        )}
      </div>
    )
  );
};
