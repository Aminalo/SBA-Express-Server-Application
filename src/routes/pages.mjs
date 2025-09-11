import { Router } from "express";
import { readDB, writeDB } from "../controllers/_db.mjs";
const r = Router();

r.get("/", async (req,res,next)=>{try{
  const db=await readDB();
  res.render("index",{ title:"TaskBoard Pro", counts:{users:db.users.length, boards:db.boards.length, tasks:db.tasks.length}, time:req.requestTime });
}catch(e){next(e)}});

r.get("/boards", async (req,res,next)=>{try{
  const db=await readDB(); res.render("boards",{ title:"Boards", boards:db.boards });
}catch(e){next(e)}});

r.get("/boards/:id", async (req,res,next)=>{try{
  const db=await readDB(); const id=req.params.id;
  const board=db.boards.find(b=>b.id===id);
  if(!board) return res.status(404).render("404",{ url:req.originalUrl });
  const tasks=db.tasks.filter(t=>t.boardId===id);
  res.render("board",{ title:board.name, board, tasks });
}catch(e){next(e)}});

r.post("/boards/:id/tasks", async (req,res,next)=>{try{
  const db=await readDB(); const id=req.params.id;
  const board=db.boards.find(b=>b.id===id);
  if(!board) return res.status(404).render("404",{ url:req.originalUrl });
  const { title, assignee="Unassigned", status="Backlog", points=1 } = req.body;
  if(!title) return res.status(400).render("error",{ status:400, message:"title is required" });
  const { nanoid } = await import("nanoid");
  const task={ id:nanoid(6), boardId:id, title, assignee, status, points:Number(points)||1 };
  db.tasks.push(task); await writeDB(db);
  res.redirect("/boards/"+id);
}catch(e){next(e)}});

export default r;