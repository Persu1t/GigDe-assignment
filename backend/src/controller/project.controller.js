import Project from "../model/Project.model.js";
import Task from "../model/Task.model.js"
export const createProject = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.id;

  try {
    // Check how many projects the user already has
    const existingProjects = await Project.find({ userId });

    if (existingProjects.length >= 4) {
      return res.status(400).json({ message: "You can only have up to 4 projects." });
    }

    const newProject = new Project({ title, userId });
    await newProject.save();

    res.status(200).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getProjects = async (req, res) => {
  const userId = req.user.id;

  try {
    const projects = await Project.find({ userId });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const project = await Project.findOneAndDelete({ _id: id, userId });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete all tasks related to this project
    await Task.deleteMany({ projectId: id });

    res.status(200).json({ message: "Project and related tasks deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};