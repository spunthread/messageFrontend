import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { Navigate, Outlet } from "react-router-dom";

export default function DeAuth() {
  const { auth } = useContext(GlobalContext);
  

  if (!auth.token) {
    return <Outlet />; // DeAuth
  } else {
    return <Navigate to="/dashboard" />;
  }
}
