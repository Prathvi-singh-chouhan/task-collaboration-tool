/* eslint-disable react/prop-types */
import axios from "axios";
import "../Single Task/Task.css";
import { useState } from "react";
import UpdateTaskPopup from "../Update Task/UpdateTaskPopup";
const Task = ({ data, onDelete, refreshFun }) => {
  const [isOpen, setIsOpen] = useState(false);

  // For date formatting function
  function formatDateTime(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    return `${formattedDate} `;
  }

  // For handle status changing
  const handleCompletionStatus = async (id) => {
    try {
      const response = await axios.patch(
        `https://taskmanagement-ct0r.onrender.com/tasks/updatestatus/${id}`
      );
      if (response.data.success) {
        refreshFun();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //update handler function

  const handleUpdate = async (updatedTask) => {
    try {
      const response = await axios.put(
        `https://taskmanagement-ct0r.onrender.com/tasks/update/${data._id}`,
        updatedTask
      );
      refreshFun();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
  };

  return (
    <div className="task">
      <h3 className="task-title">{data.title}</h3>
      <p className="task-due">Due Date: {formatDateTime(data.dueDate)}</p>
      <p className="task-due">
        Status : {data.completed ? "Completed" : "Uncompleted"}
      </p>
      <button
        onClick={() => handleCompletionStatus(data._id)}
        className="task-complete"
      >
        {data.completed ? "Mark as Uncompleted" : "Mark as Completed"}
      </button>
      <button className="task-delete" onClick={() => onDelete(data._id)}>
        Delete Task
      </button>
      <button onClick={() => setIsOpen(true)} className="task-update">
        Update Task
      </button>
      {isOpen ? (
        <UpdateTaskPopup
          onUpdate={handleUpdate}
          onCancel={() => setIsOpen(false)}
        />
      ) : null}
    </div>
  );
};

export default Task;
