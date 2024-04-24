import { MinterInterface } from '@/interfaces';

export const SearchItem = ({ minter }: { minter: MinterInterface }) => {
  return (
    <a
      className="bg-green-card-gradient border-grey-light mt-3 flex w-full items-start rounded border p-2 transition-all hover:bg-green-700"
      href={minter.uniqueUrl || '#'}
    >
      <img
        className="mr-4 size-20 rounded-full md:size-24"
        src={minter.pictureUrl || 'default-profile-url.jpg'}
        alt={`Avatar of ${minter.username}`}
      />
      <div className="flex grow flex-col justify-center">
        <div className="flex w-full items-center justify-between">
          <div className="text-lg font-bold text-white md:text-xl">@{minter.username}</div>
          {minter.isPrivate ? (
            <p className="flex items-center text-sm text-white">
              <svg className="text-grey mr-2 size-3 md:size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Private
            </p>
          ) : (
            <p className="text-base text-white">Public</p>
          )}
        </div>
        <div className="flex flex-row gap-3 text-sm italic text-white">
          <div>
            <p>Followers</p>
            <p className="font-bold">150K</p>
          </div>
          <div>
            <p>Followed</p>
            <p className="font-bold">75K</p>
          </div>
          <div>
            <p>NFTs</p>
            <p className="font-bold">120</p>
          </div>
        </div>
      </div>
    </a>
  );
};
