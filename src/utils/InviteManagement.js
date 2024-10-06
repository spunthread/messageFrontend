const baseURL = 'https://msg-board-server.onrender.com/api';


// Invite Management APIs
export const inviteBoardViewers = async (boardId, emails) => {
    try {
      const response = await fetch(`${baseURL}/user/invites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bid: boardId, emails }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to invite viewers');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const changeBoardEditors = async (boardId, userIds) => {
    try {
      const response = await fetch(`${baseURL}/user/editors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bid: boardId, userIds }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to change editors');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  
  export const fetchInvites = async (boardId) => {
    try {
      const response = await fetch(`${baseURL}/user/invites/${boardId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch invites');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  