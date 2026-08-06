import express from 'express';
import { fetchSampleUsers } from '../src/api.js';

const router = express.Router();

// Mock tasks array from GT3
const tasks = [
  { id: 1, title: 'Complete GT5 task', completed: false, dueDate: '2026-07-22' },
  { id: 2, title: 'Test Express server', completed: true, dueDate: '2026-07-25' }
];

// Cache variable for fetchSampleUsers()
let cachedUsers = [];

// Pre-fetch once on server start
try {
  cachedUsers = await fetchSampleUsers();
} catch (error) {
  console.error('Error pre-fetching users:', error);
}

// GET /api/tasks
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET /api/tasks/:id
router.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.params.id} not found` });
  }

  res.json(task);
});

// GET /api/users
router.get('/users', (req, res) => {
  res.json(cachedUsers);
});

export default router;