import Task from "../model/Task.model.js";

export const createTask = async (req, res) => {
    const { title, description, projectId } = req.body;
  
    try {
      const task = new Task({ title, description, projectId });
      await task.save();
      res.status(200).json({ message: "Task created", task });
    } catch (err) {
      res.status(500).json({ message: "Failed to create task", error: err.message });
    }
};

export const getTasks = async (req, res) => {
    const { projectId } = req.params;

  try {
    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
}

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;

  // Handle status transitions
  if (updates.status === "done" && !updates.completedAt) {
    updates.completedAt = new Date();
  } else if (updates.status !== "done") {
    updates.completedAt = null; // Clear completedAt if marking as in-progress or todo
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    if (!updatedTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deleted = await Task.findByIdAndDelete(taskId);
    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", error: err.message });
  }
};

export const getTaskById =  async (req,res)=>{
  const {taskId} = req.params;
  try{
    const getSingleTask = await Task.findById(taskId);
    if(!getSingleTask) return res.status(404).json({message: "Task not found"})
    res.status(200).json(getSingleTask)
  }catch(err){
    res.status(500).json({message: "Failed to fetch task", error: err.message})
  }
}