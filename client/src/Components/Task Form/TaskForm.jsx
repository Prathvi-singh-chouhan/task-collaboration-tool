import { useState } from "react";
import "./TaskForm.css";
import axios from "axios";

const TaskForm = () => {
  const [task, setTask] = useState({});
  const [error, setError] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title || !task.dueDate) {
      setError("Title and due date are required");
      return;
    }

    try {
      const response = await axios.post(
        "https://taskmanagement-ct0r.onrender.com/tasks/create",
        task
      );
      if (response.data.success) {
        alert("Task created successfully");
        setTask({
          name: "",
          description: "",
          dueDate: "",
        });
        setError("");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            min={today} // Set min attribute to today's date
            value={task.dueDate}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
