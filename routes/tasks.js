import express from 'express';
import verifyToken from '../middleware/verifyToken.cjs';
import requireRole from '../middleware/requireRole.cjs';
import {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', listTasks);
router.get('/:id', getTask);
router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, requireRole('admin'), deleteTask);

export default router;