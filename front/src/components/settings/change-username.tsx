import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { containsSensitiveWord } from '@/assets/filter/sensitiveWords';
import { USERNAME_REGEX } from '@/constants';
import { useAlert } from '@/context';
import { connectedMinter, updateUsername } from '@/services';
import { Button } from '@/ui';

const ChangeUsernameComponent = () => {
  const navigate = useNavigate();
  const { toggleAlert } = useAlert();
  const [currentUsername, setCurrentUsername] = useState('');
  const newUsernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await connectedMinter();
        if (details.username) {
          setCurrentUsername(details.username);
        } else {
          toggleAlert({
            alertType: 'error',
            content: 'Failed to fetch minter details.',
          });
          navigate('/login');
        }
      } catch (error) {
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
    const newUsername = newUsernameRef.current?.value.trim();

    if (!newUsername) {
      toggleAlert({
        alertType: 'error',
        content: 'Please provide a username.',
      });
      return;
    }

    if (containsSensitiveWord(newUsername)) {
      toggleAlert({
        alertType: 'error',
        content: 'The username contains inappropriate content. Please choose another one.',
      });
      return;
    }

    if (!USERNAME_REGEX.test(newUsername)) {
      toggleAlert({
        alertType: 'error',
        content: 'Please insert a valid username!',
      });
      return;
    }

    if (newUsername === currentUsername) {
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
      setCurrentUsername(newUsername);
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
    <div className="z-10 flex w-full flex-col items-center justify-between rounded-lg bg-gray-400 p-4 shadow-xl md:flex-row md:items-center md:justify-between md:p-6 lg:p-8">
      <div className="flex w-full flex-col md:flex-row md:items-center">
        <label
          htmlFor="username"
          className="text-body mb-2 block whitespace-nowrap p-2 text-center md:mb-0 md:mr-2 md:flex-1 lg:flex-1"
        >
          Username :
        </label>
        <input
          ref={newUsernameRef}
          type="text"
          id="username"
          defaultValue={currentUsername}
          className="flex-3 w-full rounded-lg bg-white/50 p-2 text-gray-100 md:mr-2 lg:mr-4"
        />
        <div className="mt-4 flex w-full items-center justify-center md:mt-0 md:w-1/4 lg:w-1/5">
          <Button size="regular" color="green" content="Update" onClick={handleUpdateUsername} />
        </div>
      </div>
    </div>
  );
};

export { ChangeUsernameComponent };
