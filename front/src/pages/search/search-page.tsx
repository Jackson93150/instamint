import { useState } from 'react';

import { SearchBar } from '@/components/search/search-bar';
import { SearchItem } from '@/components/search/search-item';
import { MinterInterface } from '@/interfaces/minter.interface';
import { searchMinters } from '@/services';

export const SearchPage = () => {
  const [minters, setMinters] = useState<MinterInterface[]>([]);

  const handleSearch = async (category: string, query: string) => {
    if (category === 'Minters') {
      const result = await searchMinters(query);
      setMinters(result);
    }
  };

  return (
    <div className="flex h-fit min-h-screen w-full flex-col items-center bg-green-100 p-4 sm:p-8">
      <div className="z-10 mt-5 w-full max-w-4xl">
        <SearchBar onSearch={handleSearch} />
        {minters.map((minter) => (
          <SearchItem key={minter.id} minter={minter} />
        ))}
      </div>
    </div>
  );
};
