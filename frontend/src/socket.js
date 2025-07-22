import { io } from "socket.io-client";

export const socket = io(`${import.meta.env.VITE_API_URL}`);

// Call this after user login
export const registerSocket = (userId) => {
  socket.emit("register", userId);
};
