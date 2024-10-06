import React from 'react'
import { Route, Routes,BrowserRouter } from "react-router-dom";
import { GlobalProvider } from './GlobalContext';
import StructuredLayout from './components/StructuredLayout';
import Dashboard from './pages/Dashboard';
import Boards from './pages/Boards';
import DeAuth from './components/Deauth';
import Auth from './components/Auth';
import Login from './pages/Login';
import SingleBoard from './pages/SingleBoard';
import InviteManagement from './pages/InviteManagement';

function App() {
  return (
    <BrowserRouter>
  
    <GlobalProvider>
<Routes>
        <Route element={<Auth />}>
          <Route element={<StructuredLayout />}>  
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/boards" element={<Boards />} />
             <Route path="/single-board" element={<SingleBoard />} />
             <Route path="/invite-management" element={<InviteManagement />} />
            
          </Route>
          <Route path="*" element={<p>Not Found</p>} />

          {/* <Route element={<StructuredLayout />}></Route> */}
          {/* <Route path="/plans" element={<Plans />} />
        <Route path="/planbuy/:pid" element={<Planbuy />} /> */}
        </Route>
        <Route element={<DeAuth />}>
    
          <Route path="/" element={<Login />} />

          {/* <Route path="/something-wrong" element={<SomethingWrong />} />
        <Route path="/success" element={<Successful />} />
        
        <Route path="/email-verification" element={<GetOtp />} />
        <Route path="/link-sent" element={<LinkSent />} />
         */}
        </Route>
      </Routes>
      </GlobalProvider>
      </BrowserRouter>
        )
}

export default App