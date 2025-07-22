import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"], // Avoid polling (Render hates it)
  withCredentials: true
});

export const registerSocket = (userId) => {
  socket.emit("register", userId);
};
