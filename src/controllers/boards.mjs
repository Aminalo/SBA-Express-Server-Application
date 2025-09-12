import { readDB, writeDB } from "./_db.mjs";

export async function listBoards(req, res, next) {
  try {
    const db = await readDB(); res.json(db.boards);
  } catch (e) { next(e) }
}

export async function getBoard(req, res, next) {
  try {
    const { id } = req.params; const db = await readDB();
    const board = db.boards.find(b => b.id === id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    const tasks = db.tasks.filter(t => t.boardId === id);
    res.json({ ...board, tasks });
  } catch (e) { next(e) }
}

export async function createBoard(req, res, next) {
  try {
    const { id, name, description = "" } = req.body;
    if (!id || !name) return res.status(400).json({ message: "id and name are required" });
    const db = await readDB();
    if (db.boards.some(b => b.id === id)) return res.status(409).json({ message: "Board id exists" });
    const board = { id, name, description }; db.boards.push(board); await writeDB(db);
    res.status(201).json(board);
  } catch (e) { next(e) }
}

export async function updateBoard(req, res, next) {
  try {
    const { id } = req.params; const db = await readDB();
    const idx = db.boards.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ message: "Board not found" });
    db.boards[idx] = { ...db.boards[idx], ...req.body }; await writeDB(db);
    res.json(db.boards[idx]);
  } catch (e) { next(e) }
}

export async function deleteBoard(req, res, next) {
  try {
    const { id } = req.params; const db = await readDB();
    const idx = db.boards.findIndex(b => b.id === id);
    if (idx === -1) return res.status(404).json({ message: "Board not found" });
    const [removed] = db.boards.splice(idx, 1);
    db.tasks = db.tasks.filter(t => t.boardId !== id);
    await writeDB(db); res.json({ deleted: removed });
  } catch (e) { next(e) }
}