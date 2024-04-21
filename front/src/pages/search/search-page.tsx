import { SearchBar } from '@/components/search/search-bar';
import { SearchItem } from '@/components/search/search-item';
import { MinterInterface } from '@/interfaces/minter.interface';

export const SearchPage = () => {
  const mintersData: MinterInterface[] = [
    {
      id: 1,
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'secret',
      phone: '123-456-7890',
      bio: 'Developer and coffee enthusiast',
      pictureUrl: 'https://wallpapers.com/images/hd/nft-monkey-c5dzjoh4mupbyf1g.jpg',
      bannerUrl: 'https://wallpapers.com/images/hd/nft-monkey-c5dzjoh4mupbyf1g.jpg',
      uniqueUrl: 'https://example.com/minter/johndoe',
      isPrivate: true,
      isValidate: true,
      twoFactorEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'secret',
      phone: '123-456-7890',
      bio: 'Developer and coffee enthusiast',
      pictureUrl: 'https://wallpapers.com/images/hd/nft-monkey-c5dzjoh4mupbyf1g.jpg',
      bannerUrl: 'https://wallpapers.com/images/hd/nft-monkey-c5dzjoh4mupbyf1g.jpg',
      uniqueUrl: 'https://example.com/minter/johndoe',
      isPrivate: false,
      isValidate: true,
      twoFactorEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'secret',
      phone: '123-456-7890',
      bio: 'Developer and coffee enthusiast',
      pictureUrl: 'https://wallpapers.com/images/hd/nft-monkey-c5dzjoh4mupbyf1g.jpg',
      bannerUrl: 'https://wallpapers.com/images/hd/nft-monkey-c5dzjoh4mupbyf1g.jpg',
      uniqueUrl: 'https://example.com/minter/johndoe',
      isPrivate: false,
      isValidate: true,
      twoFactorEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      username: 'JohnDoe',
      email: 'johndoe@example.com',
      password: 'secret',
      phone: '123-456-7890',
      bio: 'Developer and coffee enthusiast,Developer and coffee enthusiastDeveloper and coffee enthusiastDeveloper and coffee enthusiastDeveloper and coffee enthusiastDeveloper and coffee enthusiastDeveloper and coffee enthusiastDeveloper and coffee enthusiastDeveloper and coffee enthusiast',
      pictureUrl: 'https://wallpapers.com/images/hd/nft-monkey-c5dzjoh4mupbyf1g.jpg',
      bannerUrl: 'https://wallpapers.com/images/hd/nft-monkey-c5dzjoh4mupbyf1g.jpg',
      uniqueUrl: 'https://example.com/minter/johndoe',
      isPrivate: true,
      isValidate: true,
      twoFactorEnabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div className="flex h-fit min-h-screen w-full flex-col items-center bg-green-100 p-4 text-white sm:p-8">
      <div className="z-10 mt-5 w-[70vw]">
        <SearchBar />
        {mintersData.map((minter) => (
          <SearchItem key={minter.id} minter={minter} />
        ))}
      </div>
    </div>
  );
};
