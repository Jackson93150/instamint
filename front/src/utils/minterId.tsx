const getMinterId = async () => {
  try {
    const response = await fetch('http://localhost:3001/auth/me', {
      credentials: 'include', // Important pour inclure les cookies
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    const userId = data.id;
    console.log(userId);
    if (!userId) {
      console.error('User ID not found in the response.');
      return null;
    }

    return userId;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export default getMinterId;
