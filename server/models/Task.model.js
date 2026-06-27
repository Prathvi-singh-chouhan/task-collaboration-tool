const mongoose = require("mongoose");

//Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = {
  TaskModel,
};
