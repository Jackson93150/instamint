import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export const SearchBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories] = useState(['Minters', 'TeaBags', "NFT's"]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <form className="w-full">
      <div className="relative flex">
        <button
          id="dropdown-button"
          onClick={toggleDropdown}
          className="inline-flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="button"
        >
          {selectedCategory || 'Category'} <ArrowDropDownIcon />
        </button>
        {dropdownOpen && (
          <div
            id="dropdown"
            className="z-100 absolute divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
            style={{ top: '100%', left: '0' }}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
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
        <div className="flex w-full flex-row">
          <input
            type="search"
            id="search-dropdown"
            className="dark:bg-white-700 text-md border-m-3 border-m-gray-50 block flex-1 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-green-500 focus:ring-blue-500 dark:border-gray-600 dark:border-s-gray-700 dark:text-black dark:placeholder:text-gray-400 dark:focus:border-green-500"
            placeholder="Search Minters, TeaBags or NFT's"
            required
          />
          <button
            type="submit"
            className="wrounded-lg rounded border border-green-700 bg-green-700 p-2.5 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </form>
  );
};
