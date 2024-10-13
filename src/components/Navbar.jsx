import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

function Navbar({ toggleSidebar, setToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { dispatch } = useContext(GlobalContext);

  return (
    <nav className={`w-100 z-10 shadow-md bg-[#11121a]`}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex justify-between gap-14 items-center">
          <span className="logo text-white">Message App</span>
          <button
            onClick={() => setToggleSidebar(!toggleSidebar)}
            className="hidden sm:block "
            id="toggle-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed">
              <path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" />
            </svg>
          </button>
        </div>

        {/* Navbar Menu */}
        <div className=" lg:flex lg:items-center">
          <ul className="flex space-x-6">
            <li className="relative">
              <button
                className="flex items-center text-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                {/* Profile Avatar */}
                {/* <img
                  src="/path/to/avatar.svg"
                  alt="profile"
                  className="h-8 w-8 rounded-full"
                /> */}
                Profile
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul
                  className={`absolute right-0 mt-2 w-48 bg-[#11121a] border-gray-700 text-white shadow-lg rounded-md py-1`}>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <i className="bi bi-gear pe-2"></i> Settings
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => dispatch({ type: "LOGOUT" })}>
                      <i className="bi bi-box-arrow-right pe-2"></i> Logout
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
