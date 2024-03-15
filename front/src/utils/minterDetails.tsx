const getMinterDetails = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch minter details, status code: ${response.status}`);
    }

    const minterDetails = await response.json();
    return minterDetails;
  } catch (error) {
    throw new Error('Error fetching minter details:');
  }
};

export default getMinterDetails;
