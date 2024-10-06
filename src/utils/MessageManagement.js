const baseURL = 'https://msg-board-server.onrender.com/api';


// Message Management APIs
export const postMessage = async (boardId, content) => {
    try {
      const response = await fetch(`${baseURL}/user/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bid: boardId, content }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to post message');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const editMessage = async (messageId, content) => {
    try {
      const response = await fetch(`${baseURL}/user/message`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mid: messageId, content }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to edit message');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`${baseURL}/user/message`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mid: messageId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  