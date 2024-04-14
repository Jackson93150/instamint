import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { containsSensitiveWord } from '@/assets/filter/sensitiveWords';
import { USERNAME_REGEX } from '@/constants';
import { useAlert } from '@/context';
import { connectedMinter, updateUsername } from '@/services';
import { Button } from '@/ui';

const ChangeUsernameComponent = () => {
  const navigate = useNavigate();
  const { toggleAlert } = useAlert();
  const [newUsername, setNewUsername] = useState('');
  const [currentUsername, setcurrentUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const details = await connectedMinter();
      if (details.username) {
        setcurrentUsername(details.username);
      } else {
        toggleAlert({
          alertType: 'error',
          content: 'Failed to fetch minter details.',
        });
        navigate('/login');
      }
    };
    fetchData();
  }, [navigate, toggleAlert]);

  const handleUpdateUsername = async () => {
    const trimmedNewUsername = newUsername.trim();

    if (containsSensitiveWord(trimmedNewUsername)) {
      toggleAlert({
        alertType: 'error',
        content: 'The URL contains inappropriate content. Please choose another one.',
      });
      return;
    }

    if (!USERNAME_REGEX.test(trimmedNewUsername)) {
      toggleAlert({
        alertType: 'error',
        content: 'Please insert a valid username !',
      });
      return;
    }

    if (trimmedNewUsername === currentUsername) {
      toggleAlert({
        alertType: 'warning',
        content: 'No changes detected in the username.',
      });
      return;
    }

    try {
      const data = {
        username: newUsername,
      };
      await updateUsername(data);
      setcurrentUsername(newUsername);
      toggleAlert({
        alertType: 'success',
        content: 'Username updated successfully!',
      });
    } catch (error) {
      toggleAlert({
        alertType: 'warning',
        content: 'This username is already used.',
      });
    }
  };

  return (
    <div className="z-10 flex w-full flex-col">
      <div className="flex w-full items-center justify-between rounded-lg bg-gray-400 p-4 shadow-xl sm:p-6">
        <div className="flex w-full">
          <label htmlFor="username" className="text-body mr-2 flex-1 whitespace-nowrap p-2">
            Username :
          </label>
          <input
            type="text"
            id="username"
            defaultValue={currentUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="flex-3 w-full rounded-lg bg-white/50 p-2 text-gray-100"
          />
        </div>
        <div className="flex w-1/5 items-center justify-center">
          <Button size="regular" color="green" content="Update" onClick={handleUpdateUsername} />
        </div>
      </div>
    </div>
  );
};

export { ChangeUsernameComponent };
