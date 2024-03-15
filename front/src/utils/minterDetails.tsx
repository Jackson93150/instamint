const getMinterDetails = async () => {
  try {
    const response = await fetch('http://localhost:3001/auth/me', {
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
