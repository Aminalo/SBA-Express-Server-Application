import { Router } from "express";
import { readDB, writeDB } from "../controllers/_db.mjs";
import { toCSV } from "../utils/csv.mjs";

const r = Router();

// Home dashboard (shows simple counts + server time from middleware)
r.get("/", async (req, res, next) => {
  try {
    const db = await readDB();
    res.render("index", {
      title: "TaskBoard Pro",
      counts: { users: db.users.length, boards: db.boards.length, tasks: db.tasks.length },
      time: req.requestTime
    });
  } catch (e) { next(e); }
});

// Boards list
r.get("/boards", async (req, res, next) => {
  try {
    const db = await readDB();
    res.render("boards", { title: "Boards", boards: db.boards });
  } catch (e) { next(e); }
});

// Board detail (table of tasks + HTML form to create a new task)
r.get("/boards/:id", async (req, res, next) => {
  try {
    const db = await readDB();
    const id = req.params.id;
    const board = db.boards.find(b => b.id === id);
    if (!board) return res.status(404).render("404", { url: req.originalUrl });

    const tasks = db.tasks.filter(t => t.boardId === id);
    res.render("board", { title: board.name, board, tasks });
  } catch (e) { next(e); }
});

// Handle HTML form submission -> create a new task and redirect back to the board
r.post("/boards/:id/tasks", async (req, res, next) => {
  try {
    const db = await readDB();
    const id = req.params.id;
    const board = db.boards.find(b => b.id === id);
    if (!board) return res.status(404).render("404", { url: req.originalUrl });

    const { title, assignee = "Unassigned", status = "Backlog", points = 1 } = req.body;
    if (!title) return res.status(400).render("error", { status: 400, message: "title is required" });

    const { nanoid } = await import("nanoid");
    const task = { id: nanoid(6), boardId: id, title, assignee, status, points: Number(points) || 1 };
    db.tasks.push(task);
    await writeDB(db);

    res.redirect("/boards/" + id);
  } catch (e) { next(e); }
});

// ✅ CSV export of a board's tasks (download)
r.get("/boards/:id/export.csv", async (req, res, next) => {
  try {
    const db = await readDB();
    const id = req.params.id;
    const board = db.boards.find(b => b.id === id);
    if (!board) return res.status(404).render("404", { url: req.originalUrl });

    const tasks = db.tasks.filter(t => t.boardId === id);
    const headers = ["id", "title", "assignee", "status", "points"];
    const csv = toCSV(tasks, headers);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${id}-tasks.csv"`);
    res.send(csv);
  } catch (e) { next(e); }
});

export default r;