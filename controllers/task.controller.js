import { PrismaClient } from "../generated/prisma/index.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const prisma = new PrismaClient();

const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res
      .status(200)
      .json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, "Error retrieving tasks");
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Task ID is required");
  }
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, task, "Task retrieved successfully"));
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }
  const task = await prisma.task.create({
    data: {
      title,
      description,
    },
  });
  res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!id) {
    throw new ApiError(400, "Task ID is required");
  }
  if (!title && !description) {
    throw new ApiError(400, "Title or description is required");
  }
  if (title && !description) {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title },
    });
    res
      .status(200)
      .json(new ApiResponse(200, task, "Task updated successfully"));
  }
  if (!title && description) {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { description },
    });
    res
      .status(200)
      .json(new ApiResponse(200, task, "Task updated successfully"));
  }
  if (title && description) {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description },
    });
    res
      .status(200)
      .json(new ApiResponse(200, task, "Task updated successfully"));
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Task ID is required");
  }
  try {
    const task = await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(200)
      .json(new ApiResponse(200, task, "Task deleted successfully"));
  } catch (error) {
    if (error.code === "P2025") {
      throw new ApiError(404, "Task not found");
    }
    throw new ApiError(500, "Error deleting task");
  }
};

const completeTask = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Task ID is required");
  }
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed: true },
    });
    res
      .status(200)
      .json(new ApiResponse(200, task, "Task marked as completed"));
  } catch (error) {
    if (error.code === "P2025") {
      throw new ApiError(404, "Task not found");
    }
    throw new ApiError(500, "Error marking task as completed");
  }
};

const uncompleteTask = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Task ID is required");
  }
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed: false },
    });
    res
      .status(200)
      .json(new ApiResponse(200, task, "Task marked as uncompleted"));
  } catch (error) {
    if (error.code === "P2025") {
      throw new ApiError(404, "Task not found");
    }
    throw new ApiError(500, "Error marking task as uncompleted");
  }
};

export {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  uncompleteTask,
};
