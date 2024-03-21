import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { connectedMinter, updateUniqueUrl } from '@/services';
import { Button } from '@/ui';

const ChangeLinkComponent = () => {
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  //const [minterId, setMinterId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await connectedMinter();
        if (details.data) {
          setCurrentUrl(details.data.uniqueUrl);
        } else {
          setStatusMessage('Failed to fetch minter details.');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  const handleUpdateUniqueUrl = async () => {
    if (newUrl.trim() === '') {
      setStatusMessage('Please insert a valid URL.');
      return;
    }
    if (newUrl.trim() === currentUrl) {
      setStatusMessage('No changes detected in the URL.');
      return;
    }

    try {
      const data = {
        uniqueUrl: newUrl.trim(),
      };
      await updateUniqueUrl(data);
      setCurrentUrl(newUrl.trim());
      setStatusMessage('URL updated successfully!');
    } catch (error) {
      setStatusMessage('Error updating unique URL.');
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
            className="flex w-[80%] rounded-lg bg-white/50 p-2 text-gray-100"
            placeholder={currentUrl}
          />
        </div>
        <div className="flex w-[20%] items-center justify-center">
          <Button size="regular" color="green" content="Sign In" onClick={handleUpdateUniqueUrl} />
        </div>
        {statusMessage && <p className="mt-4 text-center text-white">{statusMessage}</p>}
      </div>
    </div>
  );
};

export { ChangeLinkComponent };
