import { useAuth } from "../context/ContextProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SendToggle = () => {
  const { isSend, setIsSend } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSend === "receive") {
      navigate("/receive-file");
    }
  }, [isSend]);

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
      <p className="text-xl font-bold text-purple-800 mb-4 tracking-wide">Choose Action</p>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {["send", "receive"].map((type) => (
          <button
            key={type}
            onClick={() => setIsSend(type)}
            className={`flex-1 py-3 px-6 rounded-lg text-lg font-semibold capitalize transition-all duration-200 shadow ${
              isSend === type
                ? "bg-purple-600 text-white"
                : "bg-purple-100 hover:bg-purple-200 text-purple-800"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SendToggle;
