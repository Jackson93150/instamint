import { useState } from 'react';

import { PASSWORD_REGEX } from '@/constants';
import { useAlert } from '@/context';
import { updatePassword } from '@/services/api/minter';
import { Button } from '@/ui';

const ChangePasswordComponent = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { toggleAlert } = useAlert();

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmNewPassword || !oldPassword) {
      toggleAlert({
        alertType: 'warning',
        content: 'All fields must be filled out.',
      });
      return;
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      toggleAlert({
        alertType: 'warning',
        content: 'Invalid new Password !',
      });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toggleAlert({
        alertType: 'warning',
        content: 'New password and confirmation do not match.',
      });
      return;
    }

    try {
      await updatePassword({ oldPassword, newPassword });
      toggleAlert({
        alertType: 'success',
        content: 'Password updated successfully!',
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      toggleAlert({
        alertType: 'error',
        content: 'Failed to update password. Please try again.',
      });
    }
  };

  return (
    <div className="z-10 flex w-full flex-col items-center">
      <div className="w-full rounded-lg bg-gray-400 p-4 shadow-xl sm:p-6">
        <div className="mb-4 flex flex-col sm:flex-row">
          <label htmlFor="oldPassword" className="mb-2 flex-1 whitespace-nowrap p-2 sm:mb-0 sm:mr-2">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="grow rounded-lg bg-white/50 p-2 text-gray-100"
            required
          />
        </div>
        <div className="mb-4 flex flex-col sm:flex-row">
          <label htmlFor="newPassword" className="mb-2 flex-1 whitespace-nowrap p-2 sm:mb-0 sm:mr-2">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="grow rounded-lg bg-white/50 p-2 text-gray-100"
            required
          />
        </div>
        <div className="mb-4 flex flex-col sm:flex-row">
          <label htmlFor="confirmNewPassword" className="mb-2 flex-1 whitespace-nowrap p-2 sm:mb-0 sm:mr-2">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="grow rounded-lg bg-white/50 p-2 text-gray-100"
            required
          />
        </div>
        <div className="flex flex-row-reverse">
          <Button size="regular" color="green" content="Update" onClick={handlePasswordChange} />
        </div>
      </div>
    </div>
  );
};

export { ChangePasswordComponent };
