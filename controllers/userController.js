import db from '../models/index.cjs';

const { User } = db;

// GET all users
export async function listUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}