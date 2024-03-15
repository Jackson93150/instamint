import { useEffect, useState } from 'react';

import getMinterId from '@/utils/minterId';

const ChangeLinkComponent = () => {
  const [uniqueUrl, setUniqueUrl] = useState('');
  const [minterId, setMinterId] = useState(null); // Utilisez un état pour stocker tout l'objet minter

  useEffect(() => {
    const fetchData = async () => {
      const minterId = await getMinterId(); // Récupérez tout l'objet minter
      console.log('Minter Data:', minterId);
      if (minterId) {
        setMinterId(minterId); // Stockez l'objet minter complet dans l'état
      } else {
        console.error('Failed to fetch minter data.');
      }
    };

    fetchData();
  }, []);

  const updateUniqueUrl = async () => {
    console.log('Attempting to update unique URL...');

    if (!minterId || !uniqueUrl) {
      console.error('UserId or unique URL is missing.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/minter/${minterId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Assurez-vous d'inclure un en-tête d'autorisation si nécessaire, par exemple :
          // 'Authorization': `Bearer ${yourAuthToken}`,
        },
        body: JSON.stringify({ uniqueUrl }), // Assurez-vous que le nom de la clé correspond à celui attendu par votre backend
        credentials: 'include',
      });

      if (!response.ok) {
        // Gérer les erreurs de réponse, comme une erreur 404 ou 500
        throw new Error(`Failed to update minter URL, status code: ${response.status}`);
      }

      const updatedURL = await response.json();
      console.log('URL updated successfully:', updatedURL);

      // Ici, vous pouvez mettre à jour l'état de l'application si nécessaire ou informer l'utilisateur du succès.
    } catch (error) {
      console.error('Error updating unique URL:', error);
      // Afficher un message d'erreur à l'utilisateur
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
            id="uniqueUrl"
            value={uniqueUrl}
            onChange={(e) => setUniqueUrl(e.target.value)}
            className="flex-1 rounded-lg p-2 text-gray-700"
            placeholder="https://your-unique-url.com"
          />
        </div>
        <button
          className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 font-bold text-white transition duration-150 ease-in-out hover:-translate-y-1 hover:bg-green-700"
          onClick={updateUniqueUrl}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export { ChangeLinkComponent };
