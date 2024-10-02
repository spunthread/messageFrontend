import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import { Navigate, Outlet } from "react-router-dom";

export default function Auth() {
  const { auth } = useContext(GlobalContext);
  console.log('auth', auth)



  if (auth.token) {
    return <Outlet />; // Render children if verified
  } else {
    return <Navigate to="/" />; // Redirect if not verified
  }
}
