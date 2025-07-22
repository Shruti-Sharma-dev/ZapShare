import { io } from "socket.io-client";

export const socket = io("http://localhost:3000");

// Call this after user login
export const registerSocket = (userId) => {
  socket.emit("register", userId);
};
