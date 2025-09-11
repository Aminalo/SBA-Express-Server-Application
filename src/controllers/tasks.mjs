import { readDB, writeDB } from "./_db.mjs";
import { nanoid } from "nanoid";

// GET /api/tasks?status=&assignee=&boardId=&q=
export async function listTasks(req,res,next){try{
  const { status, assignee, boardId, q } = req.query;
  const db = await readDB();
  let tasks = db.tasks;
  if (status)   tasks = tasks.filter(t => t.status === status);
  if (assignee) tasks = tasks.filter(t => (t.assignee || "").toLowerCase() === String(assignee).toLowerCase());
  if (boardId)  tasks = tasks.filter(t => t.boardId === boardId);
  if (q)        tasks = tasks.filter(t => t.title.toLowerCase().includes(String(q).toLowerCase()));
  res.json(tasks);
} catch (e) { next(e); }}

// GET /api/tasks/:id
export async function getTask(req,res,next){try{
  const { id } = req.params;
  const db = await readDB();
  const task = db.tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
} catch (e) { next(e); }}

// POST /api/tasks
export async function createTask(req,res,next){try{
  const { boardId, title, assignee = "Unassigned", status = "Backlog", points = 1 } = req.body;
  if (!boardId || !title) return res.status(400).json({ message: "boardId and title are required" });
  const db = await readDB();
  const id = nanoid(6);
  const task = { id, boardId, title, assignee, status, points: Number(points) || 1 };
  db.tasks.push(task);
  await writeDB(db);
  res.status(201).json(task);
} catch (e) { next(e); }}

// PATCH /api/tasks/:id
export async function updateTask(req,res,next){try{
  const { id } = req.params;
  const db = await readDB();
  const idx = db.tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ message: "Task not found" });
  db.tasks[idx] = { ...db.tasks[idx], ...req.body };
  await writeDB(db);
  res.json(db.tasks[idx]);
} catch (e) { next(e); }}

// DELETE /api/tasks/:id
export async function deleteTask(req,res,next){try{
  const { id } = req.params;
  const db = await readDB();
  const idx = db.tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ message: "Task not found" });
  const [removed] = db.tasks.splice(idx, 1);
  await writeDB(db);
  res.json({ deleted: removed });
} catch (e) { next(e); }}


