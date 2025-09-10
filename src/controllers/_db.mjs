// JSON "database" using fs. Replace with a real DB in production.
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const DB_PATH = path.join(__dirname, "..", "data", "db.json");
export async function readDB(){ const raw = await fs.readFile(DB_PATH, "utf-8"); return JSON.parse(raw); }
export async function writeDB(db){ await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8"); }