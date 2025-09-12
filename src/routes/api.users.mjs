import { Router } from "express";
import {
  listUsers,
  getUser,
  getUserByName, // ✅ NEW
  createUser,
  updateUser,
  deleteUser
} from "../controllers/users.mjs";

const r = Router();

r.get("/", listUsers);

// ✅ RegExp route MUST be BEFORE the numeric :id route
// Example: GET /api/users/@Amina
r.get("/@:name([A-Za-z]+)", getUserByName);

r.get("/:id(\\d+)", getUser);
r.post("/", createUser);
r.patch("/:id(\\d+)", updateUser);
r.delete("/:id(\\d+)", deleteUser);

export default r;