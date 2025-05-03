import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TaskForm = ({ id, setForEditing, taskToBeEdited }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (setForEditing && taskToBeEdited) {
      setTitle(taskToBeEdited.title);
      setDescription(taskToBeEdited.description);
    }
  }, [setForEditing, taskToBeEdited]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    console.log(title, description);
    if (setForEditing) {
      const response = await fetch(
        `http://localhost:3000/api/v1/tasks/update-task/${taskToBeEdited._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title, description, projectId: id }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setTitle("");
        setDescription("");
        setTimeout(() => {
          window.location.reload();
        }, 500);
        toast.success(data.message);
      } else {
        toast.error(data.message);
        setTitle("");
        setDescription("");
      }
    } else {
      const response = await fetch(
        "http://localhost:3000/api/v1/tasks/create-task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ title, description, projectId: id }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.message);
        setTitle("");
        setDescription("");
        window.location.reload();
      } else {
        toast.error(data.message);
        setTitle("");
        setDescription("");
        toast.error(data.message);
      }
    }
  };

  return (
    <div className="px-4 py-6 bg-[#000957]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold text-[#344CB7] mb-6 text-center">
          {setForEditing ? "Edit Task" : "Create New Task"}
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          required
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded h-32 resize-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#FFEB00] text-[#000957] font-semibold py-2 rounded hover:bg-yellow-400 transition"
        >
          {setForEditing ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
