const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User", // Reference to the User model
  //     required: true,
  //   },
});

module.exports = mongoose.model("Task", taskSchema);
