// socketWorker.js (ES module for Vite)
import { io } from "socket.io-client";

let socket;

// self refers to the global execution context of the worker thread.
self.onmessage = function (e) {
  // This gets triggered when the main thread sends a message to the worker
  const { type, roomName, message } = e.data;

  if (type === "init") {
    socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("Worker connected to socket with ID:", socket.id);
      socket.emit("join_room", roomName);
    });

    socket.on("receive_message", (data) => {
      self.postMessage({ type: "new_message", data });
    });
  }

  if (type === "send") {
    socket.emit("send_message", { roomName, message });
  }
};
