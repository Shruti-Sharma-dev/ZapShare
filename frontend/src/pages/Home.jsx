import { useEffect } from 'react';
import CategoryPannel from '../components/CategoryPannel';
import Friend from '../components/Friend';
import Navbar from '../components/Navbar';
import SendToggle from '../components/SendToggle';
import { socket } from '../socket';
import { useAuth } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isSend, category, selectedFriend, uploadUrl, file, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("receive-file", (data) => {
      console.log("📥 File received from sender:", data);
      // Optional: toast or alert
    });

    return () => {
      socket.off("receive-file");
    };
  }, []);

 useEffect(() => {
  if (user?._id) {
    socket.emit("register", user._id);
    console.log("✅ Registered socket:", user._id);
  }
}, [user?._id]);


  const handleStartSharing = () => {
    if (!isSend) {
      alert("You are in Receive mode. Switch to Send mode to share files.");
      return;
    }

    if (!category) {
      alert("Please select a category (video, audio, image, file).");
      return;
    }

    if (!selectedFriend) {
      alert("Please select a friend to send the file to.");
      return;
    }

    if (!uploadUrl) {
      alert("Please upload a file first. No file URL found.");
      return;
    }

    console.log("📤 Sending to:", selectedFriend);

    const payload = {
      receiverId: selectedFriend._id,
  
      fileUrl: uploadUrl,
      fileName: file.name,
      category,
      senderId: user._id,
    };

    socket.emit("send-file", payload);

    navigate("/send-file", {
      state: {
        receiver: selectedFriend.name,
        receiverId: selectedFriend._id,
        receiverSocketId: selectedFriend.socketId,
        fileUrl: uploadUrl,
        fileName: file.name,
        category,
        senderId: user._id,
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-violet-100">
      <Navbar />

      <div className="p-4 sm:p-6 lg:p-10 space-y-6 flex flex-col items-center">
        <SendToggle />
        <CategoryPannel />
        <Friend />

        <button
          onClick={handleStartSharing}
          className="mt-4 bg-violet-500 hover:bg-voilet-700 text-white px-8 py-3 rounded-lg shadow-md transition-all"
        >
          Start Sharing
        </button>
      </div>
    </div>
  );
};

export default Home;
