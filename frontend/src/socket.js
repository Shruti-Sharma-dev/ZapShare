import { io } from "socket.io-client";

// Create socket connection
export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"], // avoid polling issues
  withCredentials: true,
});

// Safer register function: waits for connection
export const registerSocket = (userId) => {
  if (!socket.connected) {
    socket.once("connect", () => {
      console.log("🟢 Connected, registering user:", userId);
      socket.emit("register", userId);
    });
  } else {
    console.log("🟢 Already connected, registering user:", userId);
    socket.emit("register", userId);
  }
};
