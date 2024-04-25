import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (isFocused) {
        onSearch(query);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [query, onSearch, isFocused]);

  return (
    <div className="flex grow sm:px-0">
      <input
        type="search"
        id="query"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="h-10 w-full rounded-full border p-2 shadow sm:p-4 dark:border-gray-700 dark:bg-gray-200 dark:text-gray-800"
        placeholder="Search Minters, TeaBags or NFT's"
        required
      />
    </div>
  );
};
