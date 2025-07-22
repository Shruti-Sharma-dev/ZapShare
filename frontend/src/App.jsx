// import { useState } from 'react'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Signup from './pages/Signup'
import LandingScreen from './pages/LandingScreen'
import ContextProvider from './context/ContextProvider';
import Home from './pages/Home';
import SelectFriend from './pages/SelectFriend';
import SendPage from './pages/SendPage';
import RecievePage from './pages/RecievePage';
import PrivateRoute from './components/PrivateRoute';
function App() {
  
useEffect(() => {
  socket.on("receive-file", (data) => {
    console.log("📥 [GLOBAL] Received file:", data);
  });

  return () => {
    socket.off("receive-file");
  };
}, []);

  return (
    <>
    <BrowserRouter>
    <ContextProvider>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
   
        <Route path="/select-friend" element={ <PrivateRoute><SelectFriend /></PrivateRoute>} />
        <Route path="/receive-file" element={<RecievePage />} />
        <Route path="/send-file" element={ <PrivateRoute><SendPage/></PrivateRoute>} />

      </Routes>
      </ContextProvider>
    </BrowserRouter>

    </>
  )
}

export default App
