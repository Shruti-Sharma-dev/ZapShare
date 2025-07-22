import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket"; // your socket instance
import { useAuth } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const SendPage = () => {
  const location = useLocation();
  const { receiver, fileName } = location.state || {};
  const { user } = useAuth();
    const navigate = useNavigate();

  const [status, setStatus] = useState("Preparing to send...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Notify backend this user is online
    socket.emit("user-online", user._id);

    // Send file event
    socket.emit("send-file", {
      to: receiver._id,
      from: user._id,
      fileName,
    });

    // Handle delivery status
    socket.on("file-status", (msg) => {
  if (typeof msg === "string") {
    setStatus(msg); // ok if backend sends string
  } else if (msg?.message) {
    setStatus(msg.message); // ✅ extract message from object
  } else {
    setStatus("Unknown status received."); // fallback
  }

  setProgress(100);
});


    // Simulate sending progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + 5;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      socket.off("file-status");
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 via-orange-100 to-pink-100 px-4">
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">
          Sending File to {receiver?.name}
        </h2>
        <p className="text-lg text-gray-700 mb-4">{status}</p>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-pink-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

        <button
      onClick={() => navigate("/home")}
      className="mt-6 px-4 py-2 bg-pink-500 text-white rounded"
    >
      ← Back to Home
    </button>
    </div>
  );
};

export default SendPage;
