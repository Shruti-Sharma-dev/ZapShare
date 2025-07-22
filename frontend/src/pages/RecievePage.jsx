import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useAuth } from "../context/ContextProvider";


import { useNavigate } from "react-router-dom";






const ReceivePage = () => {
  const navigate = useNavigate();
  const [fileData, setFileData] = useState(null);
  const { setSelectedFriend, setIsSend } = useAuth();


  const handleBack = () => {
  setSelectedFriend(null);
  setIsSend(null);
  navigate("/home");
};


  useEffect(() => {
    socket.on("receive-file", (data) => {
      setFileData(data);
    });

    return () => {
      socket.off("receive-file");
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-violet-100 to-pink-100 px-4">
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">
          {fileData ? "📥 New File Received!" : "⏳ Waiting for File..."}
        </h2>

        {fileData && (
          <>
            <p className="text-lg text-gray-700 mb-2">
              <strong>From:</strong> {fileData.senderId}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>File:</strong> {fileData.fileName}
            </p>
            <a
              href={fileData.fileUrl}
              download
              className="inline-block px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded shadow"
            >
              ⬇️ Download File
            </a>
          </>
        )}
      </div>

      <button
     onClick={handleBack}
      className="mt-6 px-4 py-2 bg-purple-500 text-white rounded"
    >
      ← Back to Home
    </button>
    </div>
  );
};

export default ReceivePage;
