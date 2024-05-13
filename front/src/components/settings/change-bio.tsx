import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { containsSensitiveWord } from '@/assets/filter/sensitiveWords';
import { useAlert } from '@/context';
import { connectedMinter, updateBio } from '@/services';
import { Button } from '@/ui';

const ChangeBioComponent = () => {
  const navigate = useNavigate();
  const { toggleAlert } = useAlert();
  const [newBio, setNewBio] = useState('');
  const [currentBio, setCurrentBio] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const details = await connectedMinter();
      if (!details) {
        toggleAlert({
          alertType: 'error',
          content: 'Failed to fetch minter details.',
        });
        navigate('/login');
      } else {
        const bioValue = details.bio ?? '';
        setCurrentBio(bioValue);
        setNewBio(bioValue);
      }
    };
    fetchData();
  }, [navigate, toggleAlert]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 250) {
      setNewBio(value);
    }
  };

  const handleUpdateBio = async () => {
    if (containsSensitiveWord(newBio)) {
      toggleAlert({
        alertType: 'error',
        content: 'The bio contains inappropriate content. Please choose another one.',
      });
      return;
    }

    if (newBio.length > 250) {
      toggleAlert({
        alertType: 'error',
        content: 'Bio cannot exceed 250 characters.',
      });
      return;
    }

    if (newBio === currentBio) {
      toggleAlert({
        alertType: 'warning',
        content: 'No changes detected in the bio.',
      });
      return;
    }

    try {
      const data = {
        bio: newBio,
      };
      await updateBio(data);
      setCurrentBio(newBio);
      toggleAlert({
        alertType: 'success',
        content: 'Bio updated successfully!',
      });
    } catch (error) {
      toggleAlert({
        alertType: 'error',
        content: 'An error occurred while updating the bio.',
      });
    }
  };

  return (
    <div className="relative z-10 w-full">
      <div className="flex flex-col items-center justify-between rounded-lg bg-gray-400 p-4 shadow-xl sm:p-3">
        <div className="w-full">
          <div className="flex w-full flex-col sm:flex-row sm:items-start">
            <label htmlFor="bio" className="text-body mr-2 p-2">
              Bio:
            </label>
            <div className="flex w-full flex-col sm:flex-1">
              <textarea
                id="bio"
                rows={4}
                value={newBio}
                onChange={handleChange}
                className="w-full resize-y rounded-lg bg-white/50 p-2 text-gray-100"
              />
              <small className="text-right text-xs">{newBio.length}/250</small>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full self-end sm:ml-auto sm:mt-0 sm:w-auto">
          <Button size="regular" color="green" content="Update" onClick={handleUpdateBio} />
        </div>
      </div>
    </div>
  );
};

export { ChangeBioComponent };
