import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Calendar, Check, Edit2, Trash2, TrendingUp } from "lucide-react";

const TasksPage = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [taskToBeEdited, setTaskToBeEdited] = useState(null);
  const [setForEditing, setSetForEditing] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        `https://task-tracker-890.up.railway.app/api/v1/tasks/get-tasks/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setTasks(data);
      }
    };

    fetchTasks();
  }, [id]);

  const handleDelete = async (taskId) => {
    const response = await fetch(
      `https://task-tracker-890.up.railway.app/api/v1/tasks/delete-task/${taskId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success(data.message);
    } else {
      console.error(data.message);
    }
  };

  const handleMarkDone = async (taskId) => {
    const response = await fetch(
      `https://task-tracker-890.up.railway.app/api/v1/tasks/update-task/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "done" }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: "done" } : task
        )
      );
      toast.success(data.message);
      window.location.reload();
    } else {
      console.error(data.message);
    }
  };

  const handleEdit = async (taskId) => {
    const response = await fetch(
      `https://task-tracker-890.up.railway.app/api/v1/tasks/get-task/${taskId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      setTaskToBeEdited(data);
      setSetForEditing(true);
    } else {
      console.error(data.message);
    }
  };

  const handleMarkInProgress = async (taskId) => {
    const response = await fetch(
      `https://task-tracker-890.up.railway.app/api/v1/tasks/update-task/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "in-progress" }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, status: "in-progress" } : task
        )
      );
      toast.success(data.message);
      window.location.reload();
    } else {
      console.error(data.message);
    }
  };

  return (
    <div className="flex flex-col bg-[#000957]">
      <TaskForm
        id={id}
        taskToBeEdited={taskToBeEdited}
        setForEditing={setForEditing}
      />
      <div>
        <h1 className="text-white">Tasks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-6 ">
          {/* Map through tasks here */}
          {tasks.length === 0 ? (
            <h1 className="text-white">No tasks</h1>
          ) : (
            tasks.map((task) => (
              <div
                className="bg-white text-[#000957] p-5 rounded-lg shadow-md flex flex-col gap-2"
                key={task._id}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      task.status === "done"
                        ? "bg-green-200 text-green-800"
                        : task.status === "in-progress"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{task.description}</p>
                <p className="text-xs text-gray-500 flex justify-between">
                  {new Date(task.createdAt).toLocaleString() ===
                  new Date(task.updatedAt).toLocaleString() ? (
                    <span>
                      {" "}
                      Created: <Calendar className="inline h-4" />{" "}
                      {new Date(task.createdAt).toLocaleString()}
                    </span>
                  ) : (
                    <span>
                      Updated:
                      <Calendar className="inline h-4" />{" "}
                      {new Date(task.updatedAt).toLocaleString()}
                    </span>
                  )}
                  {task.completedAt && (
                    <span>
                      Completed : <Calendar className="inline h-4" />{" "}
                      {new Date(task.completedAt).toLocaleString()}
                    </span>
                  )}
                </p>
                <div className="flex justify-end gap-2 mt-2">
                  {task.status !== "done" && (
                    <button
                      onClick={() => handleEdit(task._id)}
                      className="bg-[#344CB7] text-white px-3 py-1 rounded hover:bg-blue-800 text-sm"
                    >
                      <Edit2 />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    <Trash2 />
                  </button>
                  {task.status === "todo" && (
                    <button
                      onClick={() => handleMarkInProgress(task._id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 text-sm"
                    >
                      <TrendingUp />
                    </button>
                  )}
                  {task.status !== "done" && (
                    <button
                      onClick={() => handleMarkDone(task._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      <Check />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
