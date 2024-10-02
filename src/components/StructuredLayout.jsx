import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function StructuredLayout() {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [pageBlur, setPageBlur] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <div
      className={`flex flex-col w-screen h-screen ${!toggleSidebar ? "sidebar-icon-only" : ""} ${
        isDarkTheme ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Navbar */}
      <Navbar  toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar} />

      {/* Sidebar and Content Wrapper */}
      <div className="flex w-full flex-grow overflow-hidden">
        {/* Sidebar and Main Content */}
        <Sidebar
          toggleSidebar={toggleSidebar}
          setToggleSidebar={setToggleSidebar}
        
        />

        {/* Main Content Area */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden bg-[#111418] h-full">
         <Outlet/>
        </div>
      </div>
    </div>
  );
}
