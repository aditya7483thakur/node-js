const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const Room = require("./models/Room");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

mongoose
  .connect("mongodb://localhost:27017/chatapp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", async (roomName) => {
    console.log("Join room called with:", roomName);

    if (!roomName) {
      console.error("No room name provided");
      return;
    }

    let room = await Room.findOne({ name: roomName });

    if (!room) {
      room = new Room({ name: roomName, users: [] });
      console.log("Creating new room:", roomName);
    }

    if (!room.users.includes(socket.id)) {
      room.users.push(socket.id);
      await room.save();
      console.log("Added socket to room:", socket.id);
    }

    socket.join(roomName);
  });

  socket.on("send_message", ({ roomName, message }) => {
    io.to(roomName).emit("receive_message", {
      message,
      sender: socket.id,
      timestamp: new Date().toISOString(),
    });
  });

  socket.on("disconnect", async () => {
    console.log("User disconnected:", socket.id);
    await Room.updateMany({}, { $pull: { users: socket.id } });
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
