import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { SearchItem } from './search-item';
import { SearchOutput } from '@/interfaces';
import { formatThousand } from '@/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  minters: SearchOutput[];
}

export const SearchContentHeader = ({ minter }: { minter: SearchOutput[] }) => {
  return (
    <div className="flex w-full items-center gap-[16px] border-b border-white/10">
      <div className="gap-1U flex items-center border-b border-white">
        <span className="mobile:text-[20px] text-[16px] font-light text-white">MINTER</span>
        <div className="px-1U rounded-full bg-white/20 py-px text-[8px] font-light text-white">
          {formatThousand(minter.length)}
        </div>
      </div>
      <div className="gap-1U flex items-center">
        <span className="mobile:text-[20px] text-[16px] font-light text-white">NFT</span>
        <div className="px-1U rounded-full bg-white/20 py-px text-[8px] font-light text-white">0</div>
      </div>
      <div className="gap-1U flex items-center">
        <span className="mobile:text-[20px] text-[16px] font-light text-white">TEA BAG</span>
        <div className="px-1U rounded-full bg-white/20 py-px text-[8px] font-light text-white">0</div>
      </div>
    </div>
  );
};

export const SearchBar = ({ onSearch, minters }: SearchBarProps) => {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [path, setPath] = useState(location.pathname);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    onSearch(query);
    if (path !== location.pathname) {
      setQuery('');
      setPath(location.pathname);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [query, onSearch, location.pathname, path]);

  return (
    <>
      <div ref={searchBarRef} className="relative flex h-[32px] w-full">
        <input
          type="search"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-6U size-full rounded-full bg-[#414F58]/25 text-white outline-none placeholder:text-white/40"
          placeholder="Search Minters, TeaBags or NFT's"
          required
        />
        {!query ? (
          <SearchIcon className="right-3U top-1U absolute text-white/50" />
        ) : (
          <div className="top-10U px-8U py-4U gap-2U mobile:flex mobile:flex-col absolute left-0 hidden h-[500px] w-full overflow-y-scroll rounded-[16px] border border-white/25 bg-[#070d0a]/95">
            <SearchContentHeader minter={minters} />
            {minters.map((minter, key) => {
              return <SearchItem key={key} minter={minter} />;
            })}
          </div>
        )}
      </div>
      {query && (
        <div className="top-14U p-2U gap-2U mobile:hidden absolute left-0 flex h-[500px] w-full flex-col rounded-[16px] border border-white/25 bg-[#070d0a]/95">
          <SearchContentHeader minter={minters} />
          {minters.map((minter, key) => {
            return <SearchItem key={key} minter={minter} />;
          })}
        </div>
      )}
    </>
  );
};
