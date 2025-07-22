import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ new state
  const navigate = useNavigate();

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [category, setCategory] = useState(null);
  const [isSend, setIsSend] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState("");

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false); // ✅ done loading if no token
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setUser(res.data.user);
      } catch (err) {
        if (err.response?.status === 403) logout();
        console.error("User verification error:", err.response?.data || err);
      } finally {
        setLoading(false); // ✅ always set loading to false
      }
    };

    verifyUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-xl">
        ⏳ Verifying session...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user, login, logout,
      selectedFriend, setSelectedFriend,
      category, setCategory,
      isSend, setIsSend,
      file, setFile,
      uploadUrl, setUploadUrl
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default ContextProvider;
