import React, { useEffect, useState } from "react";
import AddProjectForm from "../components/AddProjectForm";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const AddProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://task-tracker-890.up.railway.app/api/v1/projects/get-projects",
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
          setProjects(data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const handleClick = async (projectId) => {
    try {
      const response = await fetch(
        `https://task-tracker-890.up.railway.app/api/v1/projects/delete-project/${projectId}`,
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
        const updatedProjects = projects.filter(
          (proj) => proj._id !== projectId
        );
        setProjects(updatedProjects);
        toast.success(data.message);
      } else {
        console.error("Failed to delete project:", response.statusText);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Error deleting project");
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-[#000957]">
      {/* Left: Form */}
      <div className="w-full p-4 flex justify-center">
        <AddProjectForm />
      </div>

      {/* Right: Project Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
        {projects.length === 0 ? (
          <h1 className="text-white">You have no projects initialized yet</h1>
        ) : (
          projects.map((project, index) => (
            <div
              key={index}
              className="bg-white text-[#000957] p-5 rounded-lg shadow-md flex justify-between items-center"
            >
              <Link to={`/project/${project._id}`}>
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </Link>
              <button
                className="bg-[#f42d2d] text-[#ffffff] px-4 py-2 rounded"
                onClick={() => handleClick(project._id)}
              >
                <Trash2 />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddProject;
