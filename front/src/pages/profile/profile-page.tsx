import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { getUserProfile, updatePassword } from '@/services';

export const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setsuccessMessage] = useState('');

  const handleChangePassword = () => {
    setShowChangePasswordForm((prevShowChangePasswordForm) => !prevShowChangePasswordForm);
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      await updatePassword({ oldPassword, newPassword });
      setShowChangePasswordForm(false);
      setOldPassword('');
      setNewPassword('');
      setsuccessMessage('Password changed !');
      setTimeout(() => {
        setsuccessMessage('');
      }, 5000);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const minter = await getUserProfile();
      setUsername(minter.username);
      setEmail(minter.email);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      }
    }
  };
  useEffect(() => {
    fetchUserProfile();
  });
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-green-100">
      <div className="py-6U px-8U mobile:py-8U mobile:px-10U mobile:w-fit z-10 flex w-[90%] flex-col rounded-[8px] border border-white/25 bg-white/10 backdrop-blur-[40px]">
        <h1 className="mb-4 text-2xl font-bold text-white">My Profile</h1>

        <section className="mb-4 rounded-md p-4">
          <div className="mb-2 flex items-center text-white">
            <span className="mr-2">Username:</span>
            <span>{username}</span>
          </div>
          <div className="mb-4 flex items-center text-white">
            <span className="mr-2">Email:</span>
            <span>{email}</span>
          </div>
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={handleChangePassword}>
            Change my password
          </button>
          {showChangePasswordForm && (
            <form onSubmit={handleFormSubmit} className="mt-4">
              <input
                type="password"
                placeholder="Old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="mr-2 rounded border border-gray-300 px-3 py-2"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mr-2 rounded border border-gray-300 px-3 py-2"
              />
              <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                Submit
              </button>
            </form>
          )}
          {errorMessage && <div className="mt-2 text-red-500">{errorMessage}</div>}
          {successMessage && <div className="mt-2 text-green-500">{successMessage}</div>}
        </section>
      </div>
    </div>
  );
};
