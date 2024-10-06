import { useEffect, useState } from 'react';
import CreateBoard from '../components/CreateBoard';
import ModalComponent from '../components/ModalComponent';
import { addBoard, deleteBoard, fetchBoardDetails, fetchBoardsDetails, updateBoardDetails } from '../utils/Boards'; // Using fetch-based API service
import edit from "../assets/AddEditDel/edit.svg";
import deleteSvg from "../assets/AddEditDel/delete.svg";
import { useNavigate } from 'react-router-dom';

function Boards() {
  const [show, setShow] = useState(false);
  const [fetchRefresh, setFetchRefresh] = useState(false); // For re-fetching boards on changes
  const [boardData, setBoardData] = useState({});
  const [selectedBoardId, setSelectedBoardId] = useState(null); // For handling the selected board when editing
  const [boardsData, setBoardsData] = useState([
    {
      name: 'Ava Martinez',
      message: "Hey, I'm looking for a front-end engineer. Let me know if you have any referrals.",
      image: 'https://cdn.usegalileo.ai/stability/ca159c6c-954c-4f6c-a9f9-19cde08fce93.png',
      time: '2d',
    },
    {
      name: 'Product MGMT',
      message: "We're starting the planning process for next quarter, please submit your team's OKRs by Friday.",
      image: 'https://cdn.usegalileo.ai/stability/1e6dea88-7049-4463-b578-1116b3aa1407.png',
      time: '3d',
    },
    {
      name: 'Design Team',
      message: 'New design is up for review: https://www.notion.so/...',
      image: 'https://cdn.usegalileo.ai/stability/3dc7587c-12ac-4bd6-a12b-045e68aeb915.png',
      time: '5d',
    },
    {
      name: 'Engineering',
      message: 'We are moving our weekly engineering meeting to Thursday at 10am PT.',
      image: 'https://cdn.usegalileo.ai/stability/bf15029c-fcc2-4a7c-9a8c-e9720642b4cf.png',
      time: '1w',
    },]);

  const handleAddBoard = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newBoard = {};

    formData.forEach((value, key) => {
      newBoard[key] = value;
    });

    try {
      await addBoard(newBoard);
      e.target.reset(); // Reset the form fields
      setFetchRefresh(!fetchRefresh); // Trigger refresh
      setShow(false); // Close modal
    } catch (error) {
      console.error("Failed to add board:", error);
    }
  };

  const handleEditBoard = async (e, boardId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedBoard = {};

    formData.forEach((value, key) => {
      updatedBoard[key] = value;
    });

    try {
      await updateBoardDetails(boardId, updatedBoard);
      setFetchRefresh(!fetchRefresh); // Trigger refresh
      setShow(false); // Close modal
    } catch (error) {
      console.error("Failed to edit board:", error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId);
      setFetchRefresh(!fetchRefresh); // Trigger refresh
    } catch (error) {
      console.error("Failed to delete board:", error);
    }
  };

  const handleFetchBoard = async (boardId) => {
    try {
      const boardDetails = await fetchBoardDetails(boardId);
      setBoardData(boardDetails);
      setSelectedBoardId(boardId);
      setShow(true); // Open modal for editing
    } catch (error) {
      console.error("Failed to fetch board details:", error);
    }
  };

  const handleFetchBoards = async () => {
    try {
      const boardsDetails = await fetchBoardsDetails();
      setBoardsData(boardsDetails);
    } catch (error) {
      console.error("Failed to fetch boards details:", error);
    }
  };

  useEffect(() => {
    handleFetchBoards(); // Fetch all boards on load and refresh
  }, [fetchRefresh]);
const navigate=useNavigate()
  return (
    <div style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div>
        <div className="flex items-center bg-[#111418] p-4 pb-2 justify-between">
          <div className="flex size-12 shrink-0 items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8"
              style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/59c6c6fa-e95f-4cb1-a87c-478a1f4b117c.png")' }}
            ></div>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Messages
          </h2>
        </div>

        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className="text-[#9dabb8] flex border-none bg-[#293038] items-center justify-center pl-4 rounded-l-xl border-r-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input
                placeholder="Search messages"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#293038] h-full placeholder:text-[#9dabb8] px-4 rounded-l-none pl-2 text-base font-normal leading-normal"
              />
            </div>
          </label>
        </div>

        {boardsData.map((item, index) => (
          <div onClick={()=>navigate("/single-board",{state:{_id:item?._id}})} key={index} className="flex items-center gap-4 cursor-pointer bg-[#111418] hover:bg-[#0e1113] px-4 min-h-[72px] py-2 justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit" style={{ backgroundImage: `url(${item.image})` }}></div>
              <div className="flex flex-col justify-center">
                <p className="text-white text-base font-medium leading-normal line-clamp-1">{item.name}</p>
                <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">{item.message}</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="shrink-0 mx-4">
                <p className="text-[#9dabb8] text-sm font-normal leading-normal">{item.time}</p>
              </div>

              <button onClick={(e) => {handleFetchBoard(item.id);e.stopPropagation();}} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                <img src={edit} alt="Edit" />
              </button>
              <button onClick={(e) =>{ handleDeleteBoard(item.id);e.stopPropagation()}} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <img src={deleteSvg} alt="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <CreateBoard show={show} setShow={setShow} />

      {/* Add Board Form */}
      <ModalComponent
        isOpen={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleAddBoard}
        title="Add Board"
        footerButtons={[
          { onClick: () => setShow(false), className: "btn-light", label: "Cancel" },
          { onClick: handleAddBoard, className: "btn-primary", label: "Add Board", type: "submit" },
        ]}
      >
        <label className="font-weight-bold" htmlFor="name">
          Board Name
          <input className="form-control border-primary" type="text" name="name" placeholder="Board Name" required />
        </label>
        <label className="font-weight-bold" htmlFor="description">
          Board Description
          <input className="form-control border-primary" type="text" name="description" placeholder="Board Description" required />
        </label>
      </ModalComponent>

      {/* Edit Board Modal */}
      <ModalComponent
        isOpen={show}
        handleClose={() => setShow(false)}
        handleSubmit={(e) => handleEditBoard(e, selectedBoardId)} // For editing
        title="Edit Board"
        footerButtons={[
          { onClick: () => setShow(false), className: "btn-light", label: "Cancel" },
          { onClick: (e) => handleEditBoard(e, selectedBoardId), className: "btn-primary", label: "Edit Board", type: "submit" },
          { onClick: () => handleDeleteBoard(selectedBoardId), className: "btn-danger", label: "Delete Board", type: "button" }, // Delete button
        ]}
      >
        <label className="font-weight-bold" htmlFor="name">
          Board Name
          <input className="form-control border-primary" type="text" name="name" defaultValue={boardData.name} required />
        </label>
        <label className="font-weight-bold" htmlFor="description">
          Board Description
          <input className="form-control border-primary" type="text" name="description" defaultValue={boardData.description} required />
        </label>
      </ModalComponent>
    </div>
  );
}

export default Boards;
