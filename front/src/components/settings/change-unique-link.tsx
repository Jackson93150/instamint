import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UNIQUE_URL_REGEX } from '@/constants';
import { useAlert } from '@/context';
import { connectedMinter, updateUniqueUrl } from '@/services';
import { Button } from '@/ui';

import { containsSensitiveWord } from '../../assets/filter/sensitiveWords';

const ChangeLinkComponent = () => {
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const { toggleAlert } = useAlert();

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
    const trimmedNewUrl = newUrl.trim();

    if (containsSensitiveWord(trimmedNewUrl.toLowerCase())) {
      toggleAlert({
        alertType: 'error',
        content: 'The URL contains inappropriate content. Please choose another one.',
      });

      return;
    }

    if (!UNIQUE_URL_REGEX.test(trimmedNewUrl)) {
      toggleAlert({
        alertType: 'error',
        content: 'Please insert a valid URL.',
      });
      return;
    }
    if (trimmedNewUrl === currentUrl) {
      toggleAlert({
        alertType: 'warning',
        content: 'No changes detected in the URL.',
      });
      return;
    }
    trimmedNewUrl.split('').join(' ');

    try {
      const data = {
        uniqueUrl: trimmedNewUrl,
      };
      await updateUniqueUrl(data);
      setCurrentUrl(newUrl.trim());
      toggleAlert({
        alertType: 'success',
        content: 'URL updated successfully!',
      });
    } catch (error) {
      toggleAlert({
        alertType: 'warning',
        content: 'This unique URL is already used.',
      });
    }
  };

  return (
    <div className="z-10 flex w-full flex-col">
      <div className="flex w-full items-center justify-between rounded-lg bg-gray-400 p-4 shadow-xl sm:p-6">
        <div className="flex w-full items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <label htmlFor="uniqueUrl" className="text-body">
            Unique URL :
          </label>
          <input
            type="text"
            id="newUrl"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex w-4/5 rounded-lg bg-white/50 p-2 text-gray-100"
            placeholder={currentUrl}
          />
        </div>
        <div className="flex w-1/5 items-center justify-center">
          <Button size="regular" color="green" content="Update" onClick={handleUpdateUniqueUrl} />
        </div>
      </div>
    </div>
  );
};

export { ChangeLinkComponent };
