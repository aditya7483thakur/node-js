const express = require("express");
const connectDB = require("./db/connection.js");

const Task = require("./db/Task.js");
const userRouter = require("./routes/users.js");
const taskRouter = require("./routes/tasks.js");

const app = express();

app.use(express.json());

connectDB();

app.get("/", async (req, res) => {
  res.send("Server is UP 🚀");
});

app.use(userRouter);
app.use(taskRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
