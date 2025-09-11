import { Router } from "express";
const r = Router();
r.get("/", (req, res) => res.json({ ok:true, now:new Date().toISOString(), uptime:process.uptime() }));
export default r;