import db from '../models/index.cjs';
import { validateTask } from '../src/utils.js';

const { Task, User } = db;

// GET all tasks with their owning user (JOIN)
export async function listTasks(req, res) {
  try {
    const tasks = await Task.findAll({ include: User });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET single task by id
export async function getTask(req, res) {
  try {
    const task = await Task.findByPk(req.params.id, { include: User });

    if (!task) {
      return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST create a new task
export async function createTask(req, res) {
  const newTask = req.body;
  const isValid = validateTask(newTask);

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  try {
    const createdTask = await Task.create({
      title: newTask.title,
      dueDate: newTask.dueDate,
      completed: newTask.completed ?? false,
      userId: newTask.userId
    });

    res.status(201).json(createdTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT update an existing task
export async function updateTask(req, res) {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
    }

    const updatedTask = await task.update(req.body);

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE a task
export async function deleteTask(req, res) {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
    }

    await task.destroy();

    res.status(200).json({ message: `Task with id ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}