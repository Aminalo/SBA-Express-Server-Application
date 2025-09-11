import { Router } from "express";
import { listBoards, getBoard, createBoard, updateBoard, deleteBoard } from "../controllers/boards.mjs";
const r = Router();
r.get("/", listBoards);
r.get("/:id([a-z0-9-]+)", getBoard);
r.post("/", createBoard);
r.patch("/:id([a-z0-9-]+)", updateBoard);
r.delete("/:id([a-z0-9-]+)", deleteBoard);
export default r;