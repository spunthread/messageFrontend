import { useEffect, useState } from 'react';
import ModalComponent from '../components/ModalComponent';
import { inviteBoardViewers, fetchInvites } from '../utils/InviteManagement'; // Import your API functions

function InviteManagement() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [invitesData, setInvitesData] = useState([]);
  const [emails, setEmails] = useState(''); // Comma-separated emails for inviting

  const handleFetchInvites = async () => {
    try {
      const invitesDetails = await fetchInvites(); // Fetch existing invites
      setInvitesData(invitesDetails); // Set invites to state
    } catch (error) {
      console.error("Failed to fetch invites:", error);
    }
  };

  const handleInviteViewers = async (e) => {
    e.preventDefault();
    const emailList = emails.split(',').map(email => email.trim()); // Convert to array and trim whitespace
    try {
      await inviteBoardViewers(boardId, emailList); // Invite users
      setEmails(''); // Clear input
      setShowInviteModal(false); // Close modal
      handleFetchInvites(); // Refresh invites
    } catch (error) {
      console.error("Failed to invite viewers:", error);
    }
  };

  useEffect(() => {
    handleFetchInvites(); // Fetch invites on load
  }, []);

  return (
    <div style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="flex items-center bg-[#111418] p-4 pb-2 justify-between">
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Invite Management
        </h2>
      </div>

      <div className="px-4 py-3">
        <button onClick={() => setShowInviteModal(true)} className="bg-blue-500 text-white py-2 px-4 rounded">
          Invite Viewers
        </button>
      </div>

      <div className="invite-list">
        {invitesData.map((invite, index) => (
          <div key={index} className="flex items-center gap-4 cursor-pointer bg-[#111418] hover:bg-[#0e1113] px-4 min-h-[72px] py-2 justify-between">
            <div className="flex flex-col justify-center">
              <p className="text-white text-base font-medium leading-normal line-clamp-1">{invite.email}</p>
              <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">{invite.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Viewers Modal */}
      <ModalComponent
        isOpen={showInviteModal}
        handleClose={() => setShowInviteModal(false)}
        handleSubmit={handleInviteViewers}
        title="Invite Viewers"
        footerButtons={[
          { onClick: () => setShowInviteModal(false), className: "btn-light", label: "Cancel" },
          { onClick: handleInviteViewers, className: "btn-primary", label: "Send Invites", type: "submit" },
        ]}
      >
        <label className="font-weight-bold" htmlFor="emails">
          Email Addresses (comma-separated)
          <textarea
            className="form-control border-primary"
            name="emails"
            placeholder="Enter email addresses, separated by commas"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            required
          />
        </label>
      </ModalComponent>
    </div>
  );
}

export default InviteManagement;
