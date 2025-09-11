import { readDB, writeDB } from "./_db.mjs";

// GET /api/users?role=admin
export async function listUsers(req,res,next){try{
  const { role } = req.query;
  const db = await readDB();
  let users = db.users;
  if (role) users = users.filter(u=>u.role===role);
  res.json(users);
}catch(e){next(e)}}

// GET /api/users/:id
export async function getUser(req,res,next){try{
  const id = Number(req.params.id);
  const db = await readDB();
  const user = db.users.find(u=>u.id===id);
  if(!user) return res.status(404).json({message:"User not found"});
  res.json(user);
}catch(e){next(e)}}

// POST /api/users
export async function createUser(req,res,next){try{
  const { name, role="user" } = req.body;
  if(!name) return res.status(400).json({message:"name is required"});
  const db = await readDB();
  const id = Math.max(...db.users.map(u=>u.id),0)+1;
  const user = { id, name, role };
  db.users.push(user); await writeDB(db);
  res.status(201).json(user);
}catch(e){next(e)}}

// PATCH /api/users/:id
export async function updateUser(req,res,next){try{
  const id = Number(req.params.id);
  const db = await readDB();
  const idx = db.users.findIndex(u=>u.id===id);
  if(idx===-1) return res.status(404).json({message:"User not found"});
  db.users[idx] = { ...db.users[idx], ...req.body };
  await writeDB(db);
  res.json(db.users[idx]);
}catch(e){next(e)}}

// DELETE /api/users/:id
export async function deleteUser(req,res,next){try{
  const id = Number(req.params.id);
  const db = await readDB();
  const idx = db.users.findIndex(u=>u.id===id);
  if(idx===-1) return res.status(404).json({message:"User not found"});
  const [removed] = db.users.splice(idx,1);
  await writeDB(db);
  res.json({deleted:removed});
}catch(e){next(e)}}