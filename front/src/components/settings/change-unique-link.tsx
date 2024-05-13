import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { UNIQUE_URL_REGEX } from '@/constants';
import { useAlert } from '@/context';
import { connectedMinter, updateUniqueUrl } from '@/services';
import { Button } from '@/ui';

import { containsSensitiveWord } from '../../assets/filter/sensitiveWords';

const ChangeLinkComponent = () => {
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState('');
  const { toggleAlert } = useAlert();
  const newUrlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await connectedMinter();
        if (details.uniqueUrl) {
          setCurrentUrl(details.uniqueUrl);
        } else {
          toggleAlert({
            alertType: 'error',
            content: 'Failed to fetch minter details.',
          });
        }
      } catch (error) {
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate, toggleAlert]);

  const handleUpdateUniqueUrl = async () => {
    const newUrl = newUrlRef.current?.value.trim();
    if (!newUrl) {
      toggleAlert({
        alertType: 'error',
        content: 'Please provide a URL.',
      });
      return;
    }

    if (containsSensitiveWord(newUrl.toLowerCase())) {
      toggleAlert({
        alertType: 'error',
        content: 'The URL contains inappropriate content. Please choose another one.',
      });
      return;
    }

    if (!UNIQUE_URL_REGEX.test(newUrl)) {
      toggleAlert({
        alertType: 'error',
        content: 'Please insert a valid URL.',
      });
      return;
    }
    if (newUrl === currentUrl) {
      toggleAlert({
        alertType: 'warning',
        content: 'No changes detected in the URL.',
      });
      return;
    }

    try {
      const data = { uniqueUrl: newUrl };
      await updateUniqueUrl(data);
      setCurrentUrl(newUrl);
      toggleAlert({
        alertType: 'success',
        content: 'URL updated successfully!',
      });
    } catch (error) {
      toggleAlert({
        alertType: 'error',
        content: 'This unique URL is already used.',
      });
    }
  };

  return (
    <div className="z-10 flex w-full flex-col items-center justify-between rounded-lg bg-gray-400 p-4 shadow-xl md:flex-row md:items-center md:justify-between md:p-6 lg:p-8">
      <div className="flex w-full flex-col md:flex-row md:items-center">
        <label
          htmlFor="uniqueUrl"
          className="text-body mb-2 block whitespace-nowrap p-2 text-center md:mb-0 md:mr-2 md:flex-1 lg:flex-1"
        >
          Unique URL :
        </label>
        <input
          ref={newUrlRef}
          type="text"
          id="newUrl"
          defaultValue={currentUrl}
          className="flex-3 w-full rounded-lg bg-white/50 p-2 text-gray-100 md:mr-2 lg:mr-4"
        />
        <div className="mt-4 flex w-full items-center justify-center md:mt-0 md:w-1/4 lg:w-1/5">
          <Button size="regular" color="green" content="Update" onClick={handleUpdateUniqueUrl} />
        </div>
      </div>
    </div>
  );
};

export { ChangeLinkComponent };
