import connectDB from './db/db.js';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import FileRouter from "./routes/fileRoutes.js";
import cors from "cors";
import User from "./models/user.js";
import express from 'express';
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();




app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://zap-share.vercel.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));


app.use(express.json());

app.use('/auth', authRouter);
app.use('/file', FileRouter);

// 🟡 Search User by Email
app.get("/user/search", async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json(null);
  res.json({ name: user.name, email: user.email ,_id: user._id,  });
});






app.get("/", (req, res) => {
  res.send("Socket.IO Server Running!");
});






// 🔵 Raw HTTP Server
const server = http.createServer(app);

// 🔵 Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "https://zapshare.vercel.app",  // your frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket"], // match the client side
});

// 🟡 userId => socketId mapping
const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("🟢 New socket connected:", socket.id);

  // ✅ Step 1: Register user with their socket
  socket.on("register", (userId) => {
    userSocketMap.set(userId, socket.id);
    console.log(`✅ Registered: ${userId} -> ${socket.id}`);
  });

  // ✅ Step 2: Handle file sending
 socket.on("send-file", (data) => {
  const { receiverId, senderId, fileName } = data;
  const targetSocket = userSocketMap.get(receiverId);

  if (targetSocket) {
    // Receiver is online → forward the file
    io.to(targetSocket).emit("receive-file", data);

    // Notify sender of success
    const senderSocket = userSocketMap.get(senderId);
    if (senderSocket) {
      io.to(senderSocket).emit("file-status", {
        status: "success",
        message: `✅ File "${fileName}" delivered to ${receiverId}`,
      });
    }

    console.log(`📤 File sent to ${receiverId} via socket ${targetSocket}`);
  } else {
    // Receiver is offline → notify sender
    const senderSocket = userSocketMap.get(senderId);
    if (senderSocket) {
      io.to(senderSocket).emit("file-status", {
        status: "error",
        message: `❌ User ${receiverId} is not online.`,
      });
    }

    console.log(`⚠️ Receiver ${receiverId} not online`);
  }
});


  // ✅ Step 3: Cleanup on disconnect
  socket.on("disconnect", () => {
    for (let [userId, sockId] of userSocketMap.entries()) {
      if (sockId === socket.id) {
        userSocketMap.delete(userId);
        console.log(`🔴 Disconnected: ${userId}`);
        break;
      }
    }
  });
});

const startServer = async () => {
  try {
    await connectDB();
    server.listen(3000, () => {
      console.log('🚀 Server is running on http://localhost:3000');
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

startServer();
