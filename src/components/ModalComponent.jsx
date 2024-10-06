import React from "react";

const ModalComponent = ({ isOpen, handleClose, handleSubmit, title, children, footerButtons, modalRef }) => {
  if (!isOpen) return null;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4"
        ref={modalRef}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          onKeyDown={handleKeyDown}
          className="flex flex-col"
        >
          {/* Modal Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h5 className="text-lg font-semibold">{title}</h5>
            <button onClick={handleClose} type="button" className="text-white text-2xl leading-none">
              &times;
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4">{children}</div>

          {/* Modal Footer Buttons */}
          <div className="flex justify-between gap-2 p-4">
            {footerButtons.map((button, index) => (
              <button
                key={index}
                type={button.type || "button"}
                onClick={button.onClick}
                className={`w-full py-2 px-4 rounded-md ${button.className}`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalComponent;
