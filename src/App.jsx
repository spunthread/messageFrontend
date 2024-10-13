import { Route, Routes, BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./GlobalContext";
import StructuredLayout from "./components/StructuredLayout";
import Dashboard from "./pages/Dashboard";
import Boards from "./pages/Boards";
import DeAuth from "./components/Deauth";
import Auth from "./components/Auth";
import Login from "./pages/Login";
import SingleBoard from "./pages/SingleBoard";
import InviteManagement from "./pages/InviteManagement";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_ID}
          onScriptLoadError={() =>
            console.log("Unable to log in with Google right now. Script Loading failed")
          }>
          <Routes>
            <Route element={<DeAuth />}>
              <Route
                path="/"
                element={<Login />}
              />
            </Route>
            <Route element={<Auth />}>
              <Route element={<StructuredLayout />}>
                <Route
                  path="/dashboard"
                  element={<Dashboard />}
                />
                <Route
                  path="/boards"
                  element={<Boards />}
                />
                <Route
                  path="/single-board"
                  element={<SingleBoard />}
                />
                <Route
                  path="/invite-management"
                  element={<InviteManagement />}
                />
              </Route>
            </Route>
            <Route
              path="*"
              element={<p>Page Not Found</p>}
            />
          </Routes>
        </GoogleOAuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
