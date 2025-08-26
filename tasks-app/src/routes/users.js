const express = require("express");
const User = require("../db/User.js");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error creating user" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Optional: restrict what fields can be updated
  const allowedUpdates = ["name", "email", "password"];
  const isValidUpdate = Object.keys(updates).every((key) =>
    allowedUpdates.includes(key)
  );

  if (!isValidUpdate) {
    return res.status(400).json({ error: "Invalid update fields" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error while updating user" });
  }
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Server error while deleting user" });
  }
});

module.exports = router;
