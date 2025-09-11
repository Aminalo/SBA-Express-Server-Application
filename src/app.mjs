import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import apiUsers from "./routes/api.users.mjs";
import apiBoards from "./routes/api.boards.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Core middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Home
app.get("/", (req, res) => res.render("index", { title: "TaskBoard Pro" }));

// API routes
app.use("/api/users", apiUsers);
app.use("/api/boards", apiBoards);

// 404 + basic error (will be improved later commits)
app.use((req, res) => res.status(404).send("Not Found"));
app.use((err, req, res, next) => { console.error(err); res.status(500).send("Internal Error"); });

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
