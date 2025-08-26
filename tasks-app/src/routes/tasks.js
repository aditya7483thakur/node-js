const express = require("express");
const Task = require("../db/Task.js");

const router = express.Router();

// Create Task
router.post("/task", async (req, res) => {
  try {
    const { title, description, completed, userId } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title and userId are required." });
    }

    // Optional: you might want to check if userId exists in DB first

    const task = new Task({
      title,
      description,
      status: completed || false,
      //   user: userId,
    });

    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error creating task" });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find(); // fetch all users
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching Tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📘 2. Get a single user by ID
router.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/task/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const allowedUpdates = ["title", "description", "completed"];
  const isValidUpdate = Object.keys(updates).every((key) =>
    allowedUpdates.includes(key)
  );

  if (!isValidUpdate) {
    return res.status(400).json({ error: "Invalid update fields" });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true, // return updated doc
      runValidators: true, // validate with schema
    });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Server error while updating task" });
  }
});

router.delete("/task/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid task ID" });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Server error while deleting task" });
  }
});

module.exports = router;
