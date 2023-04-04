import express from "express";

import {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  getUserById,
} from "../controllers/users.js";

const router = express.Router();

router.post("/users", createUsers);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUsers);
router.delete("/users/:id", deleteUsers);

export default router;
