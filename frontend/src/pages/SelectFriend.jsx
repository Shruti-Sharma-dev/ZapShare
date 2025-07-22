import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const SelectFriend = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setSelectedFriend } = useAuth();

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/search?email=${searchEmail}`);
      setFoundUser(res.data);
      setError("");
    } catch (err) {
      setFoundUser(null);
      if (err.response?.status === 404) {
        setError("No user found");
      } else {
        setError("An error occurred. Please try again.");
        console.error(err);
      }
    }
  };

  const selectThisUser = () => {
    setSelectedFriend(foundUser);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-100 to-rose-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-semibold text-purple-700 mb-6 text-center">🔍 Select a Friend</h1>

        <input
          type="text"
          placeholder="Enter email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border border-purple-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition-all"
        >
          Search
        </button>

        {error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}

        {foundUser && (
          <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-inner text-purple-900">
            <p><span className="font-semibold">Name:</span> {foundUser.name}</p>
            <p><span className="font-semibold">Email:</span> {foundUser.email}</p>
            <button
              onClick={selectThisUser}
              className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md w-full transition-all"
            >
              ✅ Select Friend
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectFriend;
