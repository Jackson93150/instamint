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
    <div className="mx-auto max-w-full sm:max-w-md">
      <div className="rounded-lg bg-gray-400 p-4 shadow-xl sm:p-6">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <label htmlFor="uniqueUrl" className="text-body block sm:inline-block">
            Unique URL :
          </label>
          <input
            type="text"
            id="newUrl"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1 rounded-lg p-2 text-gray-100"
            placeholder={currentUrl}
          />
        </div>
        <div className="mt-8U flex items-center justify-center">
          <Button color="green" content="Sign In" onClick={handleUpdateUniqueUrl} />
        </div>
        {statusMessage && <p className="mt-4 text-center text-white">{statusMessage}</p>}
      </div>
    </div>
  );
};

export { ChangeLinkComponent };
