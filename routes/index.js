import express from 'express';
import { mockTasks, validateTask, mergeTaskUpdate } from '../src/utils.js';
import { fetchSampleUsers } from '../src/api.js';

const router = express.Router();

let cachedUsers = [];

export async function initUsers() {
  cachedUsers = await fetchSampleUsers();
}

router.get('/tasks', (req, res) => {
  res.json(mockTasks);
});

router.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = mockTasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }

  res.json(task);
});

router.post('/tasks', (req, res) => {
  const newTask = req.body;
  const isValid = validateTask(newTask);

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  const createdTask = { id: Date.now(), completed: false, ...newTask };
  mockTasks.push(createdTask);

  res.status(201).json(createdTask);
});

router.put('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = mockTasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }

  const updatedTask = mergeTaskUpdate(task, req.body);
  const index = mockTasks.findIndex((t) => t.id === id);
  mockTasks[index] = updatedTask;

  res.status(200).json(updatedTask);
});

router.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = mockTasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }

  mockTasks.splice(index, 1);

  res.status(200).json({ message: `Task with id ${req.params.id} deleted` });
});

router.get('/users', (req, res) => {
  res.json(cachedUsers);
});

export default router;