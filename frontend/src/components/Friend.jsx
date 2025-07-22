import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Friend = () => {
  const { selectedFriend } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg font-medium text-gray-800">
          {selectedFriend ? 'Change Friend?' : 'Select Friend'}
        </p>

        <button
          onClick={() => navigate('/select-friend')}
          className="text-white bg-purple-600 px-4 py-1 rounded-full text-lg font-semibold shadow hover:bg-purple-700 transition-all"
        >
          +
        </button>
      </div>

      {selectedFriend && (
        <p className="text-sm text-gray-700">
          Selected: <span className="font-semibold text-gray-900">{selectedFriend.name}</span>
        </p>
      )}
    </div>
  );
};

export default Friend;
