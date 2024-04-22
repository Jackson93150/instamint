import { Chip } from '@mui/material';
import { ChangeEvent, KeyboardEvent, Dispatch, SetStateAction } from 'react';

import { COUNTRY } from '@/constants/country';

interface CountrySelect {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

export const CountrySelectInput = ({ location, setLocation }: CountrySelect) => {
  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };
  return (
    <div className="gap-2U flex flex-col">
      <label htmlFor="location" className="ml-1U text-body block text-white/90">
        Location
      </label>
      <select
        name="country"
        id="location"
        className="p-2U gap-1U flex h-fit w-full flex-col rounded-[5px] border border-white/50"
        value={location}
        onChange={handleLocationChange}
      >
        {COUNTRY.map((country, key) => {
          return (
            <option key={key} value={country.code}>
              {country.flag} {country.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

interface TextInput {
  title: string;
  placeholder: string;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

export const ModalTextInput = ({ name, placeholder, title, setName }: TextInput) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <div className="gap-2U flex flex-col">
      <label htmlFor="text" className="ml-1U text-body block text-white/90">
        {title}
      </label>
      <input
        id="text"
        className="p-2U text-body block w-full rounded-[5px] border border-white/50 bg-white/10 text-white/80"
        placeholder={placeholder}
        value={name}
        onChange={handleNameChange}
      />
    </div>
  );
};

export const ModalTextArea = ({ name, placeholder, title, setName }: TextInput) => {
  const handleNameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setName(e.target.value);
  };
  return (
    <div className="gap-2U flex flex-col">
      <label htmlFor="description" className="ml-1U text-body block text-white/90">
        {title}
      </label>
      <textarea
        id="description"
        rows={5}
        className="p-2U text-body block w-full rounded-[5px] border border-white/50 bg-white/10 text-white/80"
        placeholder={placeholder}
        value={name}
        onChange={handleNameChange}
      ></textarea>
    </div>
  );
};

interface HashtagsInput {
  hashtags: string[];
  inputValue: string;
  setHashtags: Dispatch<SetStateAction<string[]>>;
  setInputValue: Dispatch<SetStateAction<string>>;
}

export const TagInput = ({ hashtags, inputValue, setHashtags, setInputValue }: HashtagsInput) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      let newHashtag = inputValue.trim();
      if (!newHashtag.startsWith('#')) {
        newHashtag = '#' + newHashtag;
      }
      setHashtags([...hashtags, newHashtag]);
      setInputValue('');
    }
  };

  const handleDelete = (deletedHashtag: string) => {
    setHashtags(hashtags.filter((hashtag) => hashtag !== deletedHashtag));
  };
  return (
    <div className="gap-2U flex flex-col">
      <span className="ml-1U text-body block text-white/90">Hashtag</span>
      <div className="p-2U gap-1U flex h-fit w-full flex-col rounded-[5px] border border-white/50">
        <div className="pb-2U gap-1U flex w-full overflow-x-scroll">
          {hashtags.map((hashtag, key) => {
            return (
              <Chip
                key={key}
                label={hashtag}
                variant="outlined"
                color="success"
                onDelete={() => handleDelete(hashtag)}
              />
            );
          })}
        </div>
        <input
          type="text"
          id="name"
          name="name"
          className="p-1U w-full rounded-[5px] bg-white/10 text-white/80"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={hashtags.length >= 5}
        />
      </div>
    </div>
  );
};
