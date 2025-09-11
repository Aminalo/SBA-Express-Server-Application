import { Router } from "express";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/users.mjs";
const r = Router();
r.get("/", listUsers);
r.get("/:id(\\d+)", getUser);
r.post("/", createUser);
r.patch("/:id(\\d+)", updateUser);
r.delete("/:id(\\d+)", deleteUser);
export default r;