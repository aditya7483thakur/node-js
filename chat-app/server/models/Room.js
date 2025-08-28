const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  users: [String], // socket IDs
});

module.exports = mongoose.model("Room", RoomSchema);
