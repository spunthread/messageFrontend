export const fetchBoardsDetails = async () => {
    try {
      const response = await fetch(`/boards`);
      if (!response.ok) {
        throw new Error(`Error fetching boards details: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching boards details:`, error);
      throw error;
    }
  };


export const fetchBoardDetails = async (boardId) => {
    try {
      const response = await fetch(`/boards/${boardId}`);
      if (!response.ok) {
        throw new Error(`Error fetching board details for ${boardId}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching board details for ${boardId}:`, error);
      throw error;
    }
  };
  
  export const addBoard = async (boardData) => {
    try {
      const response = await fetch(`/boards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardData),
      });
      if (!response.ok) {
        throw new Error(`Error adding board: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error adding board:", error);
      throw error;
    }
  };
  
  export const updateBoardDetails = async (id, boardData) => {
    try {
      const response = await fetch(`/boards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardData),
      });
      if (!response.ok) {
        throw new Error(`Error updating board details for ${id}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating board details for ${id}:`, error);
      throw error;
    }
  };
  
  export const deleteBoard = async (data) => {
    try {
      const response = await fetch(`/boards`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error deleting board: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error deleting board:`, error);
      throw error;
    }
  };
  