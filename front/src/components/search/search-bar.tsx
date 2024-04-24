import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (category: string, query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories] = useState(['Minters', 'TeaBags', "NFT's"]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Minters');
  const [query, setQuery] = useState('');

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
    onSearch(category, query);
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    if (query.length > 0) {
      onSearch(selectedCategory, query);
    }
  }, [query, selectedCategory, onSearch]);

  return (
    <div className="mt-5 w-full sm:px-0">
      <div className="relative flex flex-col items-center sm:flex-row">
        <button
          id="dropdown-button"
          onClick={toggleDropdown}
          className="mb-4 inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-800 sm:mb-0 sm:mr-2 dark:focus:ring-green-800"
          type="button"
        >
          {selectedCategory} <ArrowDropDownIcon />
        </button>
        {dropdownOpen && (
          <div
            id="dropdown"
            className="absolute left-0 top-full z-10 mt-1 w-full divide-y divide-gray-100 rounded-lg bg-white shadow sm:w-auto dark:bg-gray-700"
          >
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                    selectedCategory === category ? 'bg-gray-200 dark:bg-gray-800' : ''
                  }`}
                  onClick={() => selectCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex w-full">
          <input
            type="search"
            id="query"
            onChange={(e) => setQuery(e.target.value)}
            className="text-md block w-full flex-1 rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-green-500 focus:ring-green-500 dark:border-gray-600 dark:text-black dark:placeholder:text-gray-400 dark:focus:border-green-500"
            placeholder="Search Minters, TeaBags or NFT's"
            required
          />
        </div>
      </div>
    </div>
  );
};
