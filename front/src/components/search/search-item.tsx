import { MinterInterface } from '@/interfaces';

export const SearchItem = ({ minter }: { minter: MinterInterface }) => {
  return (
    <a className="mt-3 lg:flex" href={minter.uniqueUrl || '#'}>
      <div
        className="h-48 flex-none overflow-hidden rounded-t bg-cover object-scale-down text-center lg:h-auto lg:w-48 lg:rounded-l lg:rounded-t-none"
        style={{ backgroundImage: `url('${minter.pictureUrl || 'default-banner-url.jpg'}')` }}
        title={minter.username}
      ></div>
      <div className="border-grey-light lg:border-grey-light flex flex-col justify-between rounded-b border-x border-b bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t">
        <div className="mb-8">
          {minter.isPrivate && (
            <p className="flex items-center text-sm text-black">
              <svg className="text-grey mr-2 size-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              Private Profile
            </p>
          )}
          <div className="mb-2 text-xl font-bold text-black">{minter.username}</div>
          <p className="text-black">{minter.bio || 'No bio available.'}</p>
        </div>
        <div className="flex items-center">
          <img
            className="mr-4 size-10 rounded-full"
            src={minter.pictureUrl || 'default-profile-url.jpg'}
            alt={`Avatar of ${minter.username}`}
          />
          <div className="text-sm">
            <p className="leading-none text-black">{minter.username}</p>
            <p className="text-black">Joined: {new Date(minter.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </a>
  );
};
