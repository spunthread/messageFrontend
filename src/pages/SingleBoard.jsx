import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For accessing URL parameters
import { postMessage, editMessage, deleteMessage } from '../utils/MessageManagement'; // Import your API functions
import {fetchBoardDetails} from '../utils/Boards'
import edit from "../assets/AddEditDel/edit.svg";
import deleteSvg from "../assets/AddEditDel/delete.svg";

function SingleBoard() {
  const { boardId } = useParams(); // Get the board ID from the URL
  const [boardData, setBoardData] = useState( {
    name: 'Ava Martinez',
    message: "Hey, I'm looking for a front-end engineer. Let me know if you have any referrals.",
    image: 'https://cdn.usegalileo.ai/stability/ca159c6c-954c-4f6c-a9f9-19cde08fce93.png',
    time: '2d',
  },);
  const [messages, setMessages] = useState(  [
    {
      id: 1,
      content: "Hello, how are you?",
      time: "10:00 AM",
    },
    {
      id: 2,
      content: "I'm doing well, thank you!",
      time: "10:01 AM",
    },
    {
      id: 3,
      content: "What are you up to today?",
      time: "10:02 AM",
    },
    {
      id: 4,
      content: "Just working on a project.",
      time: "10:03 AM",
    },
    {
      id: 5,
      content: "That sounds interesting! What kind of project?",
      time: "10:04 AM",
    },
    {
      id: 6,
      content: "It's a chat application using React.",
      time: "10:05 AM",
    },
    {
      id: 7,
      content: "Nice! Do you need any help?",
      time: "10:06 AM",
    },
    {
      id: 8,
      content: "Yes, any tips on state management?",
      time: "10:07 AM",
    },
    {
      id: 9,
      content: "You can use Context API or Redux for that.",
      time: "10:08 AM",
    },
    {
      id: 10,
      content: "Thanks! I'll look into it.",
      time: "10:09 AM",
    },
  ]
  );
  const [messageContent, setMessageContent] = useState('');
  const [editingMessageId, setEditingMessageId] = useState(null); // Track which message is being edited

  const handleFetchBoard = async () => {
    try {
      const boardDetails = await fetchBoardDetails(boardId);
      setBoardData(boardDetails);
      setMessages(boardDetails.messages || []); // Assuming messages are part of the board details
    } catch (error) {
      console.error("Failed to fetch board details:", error);
    }
  };

  const handleAddMessage = async (e) => {
    e.preventDefault();
    try {
      await postMessage(boardId, messageContent);
      setMessageContent(''); // Clear input
      handleFetchBoard(); // Refresh messages
    } catch (error) {
      console.error("Failed to add message:", error);
    }
  };

  const handleEditMessage = async (messageId) => {
    if (!messageContent.trim()) return; // Prevent empty messages
    try {
      await editMessage(messageId, messageContent);
      setMessageContent(''); // Clear input
      setEditingMessageId(null); // Clear editing state
      handleFetchBoard(); // Refresh messages
    } catch (error) {
      console.error("Failed to edit message:", error);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      await deleteMessage(messageId);
      handleFetchBoard(); // Refresh messages
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  useEffect(() => {
    handleFetchBoard(); // Fetch board details and messages on load
  }, [boardId]);

  return (
<div style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }} className="flex flex-col h-full relative">
  <div className="absolute top-0 left-0 w-full p-4 border-t border-gray-700 bg-[#2A2D30] flex items-center">
    <h2 className="text-white text-lg font-bold flex-1 text-center">
      {boardData.name}
    </h2>
  </div>

  <div className="flex-1 overflow-y-auto px-4 my-20">
    {messages.map((message) => (
      <div key={message.id} className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          {editingMessageId === message.id ? (
            <div className="flex items-center">
              <input
                type="text"
                className="border rounded-lg px-4 py-2 w-64"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onBlur={() => handleEditMessage(message.id)} // Save on blur
                placeholder="Edit your message"
              />
              <button onClick={() => handleEditMessage(message.id)} className="text-blue-500 ml-2">
                Save
              </button>
            </div>
          ) : (
            <p className="text-white text-base font-medium">{message.content}</p>
          )}
          <div className="flex gap-2 mt-1">
            <span className="text-[#9dabb8] text-sm">{message.time}</span>
            <button onClick={() => {
              setMessageContent(message.content);
              setEditingMessageId(message.id);
            }} className="text-yellow-500">
              <img src={edit} alt="Edit" className="inline h-5" />
            </button>
            <button onClick={() => handleDeleteMessage(message.id)} className="text-red-500">
              <img src={deleteSvg} alt="Delete" className="inline h-5" />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Message Input Box */}
  <form onSubmit={handleAddMessage} className="absolute bottom-18 md:bottom-0 left-0 w-full p-4 border-t border-gray-700 bg-[#2A2D30] flex items-center">
    <input
      type="text"
      className="flex-1 border rounded-lg px-4 py-2 text-white bg-[#293038] placeholder:text-[#9dabb8] focus:outline-none"
      placeholder="Type your message here..."
      value={messageContent}
      onChange={(e) => setMessageContent(e.target.value)}
      required
    />
    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded ml-2">Send</button>
  </form>
</div>
 
  
  );
}

export default SingleBoard;
