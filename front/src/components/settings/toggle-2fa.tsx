import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAlert } from '@/context';
import { connectedMinter, toggleTwoFactorAuth } from '@/services';
import { SwitchButton } from '@/ui/buttons/buttonswitch';

const ToggleTwoFactorAuthComponent = () => {
  const navigate = useNavigate();
  const { toggleAlert } = useAlert();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await connectedMinter();
        if (details.twoFactorEnabled !== undefined) {
          setIsEnabled(details.twoFactorEnabled);
        } else {
          throw new Error('2FA status is not available.');
        }
      } catch (error) {
        toggleAlert({
          alertType: 'error',
          content: 'Failed to fetch 2FA details.',
        });
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate, toggleAlert]);

  const handleToggle = async () => {
    try {
      const result = await toggleTwoFactorAuth({ isEnabled: !isEnabled });
      setIsEnabled(!isEnabled);
      toggleAlert({
        alertType: 'success',
        content: result.message || '2FA status updated successfully.',
      });
    } catch (error) {
      toggleAlert({
        alertType: 'error',
        content: 'Failed to toggle 2FA',
      });
    }
  };

  return (
    <div className="flex w-full flex-col rounded-lg bg-gray-400 p-4 shadow-xl md:p-6">
      <div className="flex w-full flex-col items-center justify-between md:flex-row">
        <h3 className="text-md mb-4 text-center font-semibold md:mb-0">Two-Factor Authentication</h3>
        <SwitchButton isOn={isEnabled} onToggle={handleToggle} />
      </div>
    </div>
  );
};

export { ToggleTwoFactorAuthComponent };
