import React, { useRef } from 'react';

import PasswordInput from './password-input';
import { PASSWORD_REGEX } from '@/constants';
import { useAlert } from '@/context';
import { updatePassword } from '@/services/api/minter';
import { Button } from '@/ui';

const ChangePasswordComponent = () => {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmNewPasswordRef = useRef<HTMLInputElement>(null);
  const { toggleAlert } = useAlert();

  const handlePasswordChange = async () => {
    const oldPassword = oldPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const confirmNewPassword = confirmNewPasswordRef.current?.value;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toggleAlert({
        alertType: 'warning',
        content: 'All fields must be filled out.',
      });
      return;
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      toggleAlert({
        alertType: 'warning',
        content: 'Invalid new Password!',
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
      oldPasswordRef.current.value = '';
      newPasswordRef.current.value = '';
      confirmNewPasswordRef.current.value = '';
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
        <PasswordInput label="Old Password" ref={oldPasswordRef} />
        <PasswordInput
          label="New Password"
          ref={newPasswordRef}
          helpeText="* The password must be a minimum of 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character (e.g., !@#$%^&*)."
        />
        <PasswordInput label="Confirm New Password" ref={confirmNewPasswordRef} />
        <div className="flex flex-row-reverse">
          <Button size="regular" color="green" content="Update" onClick={handlePasswordChange} />
        </div>
      </div>
    </div>
  );
};

export { ChangePasswordComponent };
