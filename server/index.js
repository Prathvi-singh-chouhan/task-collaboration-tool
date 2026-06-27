// All imports
const express = require("express");
const connection = require("./config/db");
const { taskRouter } = require("./routes/task.route");
const cors = require("cors");
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi Welcome to HomePage");
});

app.use("/tasks", taskRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("mongoDb connection established");
  } catch (error) {
    console.log("Error while connecting mongoDB");
  }
});
