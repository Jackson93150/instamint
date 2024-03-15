import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import getMinterDetails from '@/utils/minterDetails';

const ChangeLinkComponent = () => {
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [minterId, setMinterId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const details = await getMinterDetails();
      if (details) {
        setMinterId(details.id);
        setCurrentUrl(details.uniqueUrl);
      } else {
        setStatusMessage('Failed to fetch minter details.');
      }
    };

    fetchData();
  }, []);

  const updateUniqueUrl = async () => {
    if (!minterId) {
      navigate('/login');
    }
    if (newUrl.trim() === '') {
      setStatusMessage('Please insert a valid URL.');
      return;
    }
    if (newUrl.trim() === currentUrl || newUrl === '') {
      setStatusMessage('No changes detected in the URL.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/minter/${minterId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uniqueUrl: newUrl }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to update minter URL, status code: ${response.status}`);
      }
      const updatedURL = await response.json();
      setCurrentUrl(updatedURL.uniqueUrl);
      setStatusMessage('URL updated successfully!');
    } catch (error) {
      setStatusMessage('Error updating unique URL.');
    }
  };

  return (
    <div className="mx-auto max-w-full sm:max-w-md">
      <div className="rounded-lg bg-gray-800 p-4 shadow-xl sm:p-6">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <label htmlFor="uniqueUrl" className="block text-lg sm:inline-block">
            Unique URL :
          </label>
          <input
            type="text"
            id="newUrl"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1 rounded-lg p-2 text-gray-700"
            placeholder={currentUrl}
          />
        </div>
        <button
          className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:-translate-y-1 hover:bg-green-700"
          onClick={updateUniqueUrl}
        >
          Update
        </button>
        {statusMessage && <p className="mt-4 text-center text-white">{statusMessage}</p>}
      </div>
    </div>
  );
};

export { ChangeLinkComponent };
