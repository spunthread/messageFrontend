const baseURL = 'https://msg-board-server.onrender.com/api';

// User Authentication (Login)
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${baseURL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Failed to log in');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};



