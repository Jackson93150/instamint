import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';

import { NftCardScene } from '../threejs/nft-card';
import { COUNTRY } from '@/constants/country';
import { useAlert, useModal } from '@/context';
import { DraftInterface } from '@/interfaces';
import { connectedMinter, createDraft } from '@/services';
import { Button } from '@/ui';

interface Props {
  url: string;
  mediaType: 'video' | 'image' | 'audio';
  content: number;
  type?: 'content' | 'draft';
  data?: DraftInterface;
}

export const MediaViewerModal = ({ url, mediaType, content, type = 'content', data }: Props) => {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const { closeModal } = useModal();
  const { toggleAlert } = useAlert();

  const dataHashtags = data?.hashtag ? data.hashtag.split(',').map((item) => '#' + item) : [];

  useEffect(() => {
    if (data) {
      setHashtags(dataHashtags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  const handleSave = async () => {
    if (location) {
      const minter = await connectedMinter();
      const draft = {
        description: description,
        author: minter.username,
        hashtag: hashtags.join(','),
        location: location,
        minter: minter.id,
        content: content,
      };
      try {
        await createDraft(draft);
        toggleAlert({
          alertType: 'success',
          content: 'Your draft as been saved.',
        });
        closeModal();
      } catch (error) {
        toggleAlert({
          alertType: 'error',
          content: error as string,
        });
        closeModal();
      }
    } else {
      toggleAlert({
        alertType: 'error',
        content: 'You have to fill all the required field.',
      });
    }
  };

  return (
    <div className="gap-5U mobile:flex-row mobile:w-fit mobile:h-[70vh] flex h-[80vh] w-[85vw] flex-col overflow-y-scroll">
      <div className="mobile:w-[40vw] mobile:h-[70vh] relative flex h-[60vh] w-[85vw]">
        <NftCardScene url={url} mediaType={mediaType} />
        {mediaType === 'audio' && (
          <div className="p-2U bottom-5U absolute left-[5%] w-[90%] rounded-[10px] bg-white/30 backdrop-blur-[15px]">
            <audio controls className="w-full">
              <source src={url} type="audio/ogg" />
            </audio>
          </div>
        )}
      </div>
      <div className="mobile:gap-4U gap-6U mobile:w-[40vw] mobile:h-[70vh] flex h-fit w-[85vw] flex-col justify-between">
        <div className="gap-4U flex flex-col">
          <div className="gap-2U flex flex-col">
            <label htmlFor="description" className="ml-1U text-body block text-white/90">
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              className="p-2U text-body block w-full rounded-[5px] border border-white/50 bg-white/10 text-white/80"
              placeholder="Write your description here..."
              value={type === 'draft' ? data?.description : description}
              onChange={handleDescriptionChange}
              disabled={type === 'draft'}
            ></textarea>
          </div>

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
                disabled={hashtags.length >= 5 || type === 'draft'}
              />
            </div>
          </div>

          <div className="gap-2U flex flex-col">
            <label htmlFor="location" className="ml-1U text-body block text-white/90">
              Location
            </label>
            <select
              name="country"
              id="location"
              className="p-2U gap-1U flex h-fit w-full flex-col rounded-[5px] border border-white/50"
              value={type === 'draft' ? data?.location : location}
              onChange={handleLocationChange}
              disabled={type === 'draft'}
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
        </div>
        <div className="flex h-fit w-full items-center justify-between">
          {type === 'content' && <Button color={'transparent'} content="Save" onClick={handleSave} />}
          <Button color={'green'} content="Mint" />
        </div>
      </div>
    </div>
  );
};
