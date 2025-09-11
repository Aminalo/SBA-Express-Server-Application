import { Router } from "express";
import { listTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/tasks.mjs";
const r = Router();
r.get("/", listTasks);                          // ?status=&assignee=&boardId=&q=
r.get("/:id([A-Za-z0-9_-]+)", getTask);
r.post("/", createTask);
r.patch("/:id([A-Za-z0-9_-]+)", updateTask);
r.delete("/:id([A-Za-z0-9_-]+)", deleteTask);
export default r;