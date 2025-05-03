import { useState } from "react";
import { toast } from "react-toastify";
const AddProject = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    console.log(title);
    const response = await fetch(
      "https://task-tracker-890.up.railway.app/api/v1/projects/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      toast.success(data.message || "Project created successfully");
      setTitle("");
      window.location.reload();
    } else {
      toast.error(data.message || "Failed to create project");
      setTitle("");
    }
  };

  return (
    <div className="bg-[#000957] text-white px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md mb-10 text-black"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#344CB7]">
          Create New Project
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Name"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#FFEB00] text-[#000957] font-semibold py-2 rounded hover:bg-yellow-400 transition"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
