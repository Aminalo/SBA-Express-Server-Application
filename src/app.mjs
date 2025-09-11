import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import apiUsers from "./routes/api.users.mjs";
import apiBoards from "./routes/api.boards.mjs";

// custom middlewares
import globalERR from "./middleware/globalERR.mjs";
import requestTime from "./middleware/requestTime.mjs";
import requireJson from "./middleware/requireJson.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

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

// Custom middlewares
app.use(requestTime);
app.use(requireJson);

// Home
app.get("/", (req, res) => res.render("index", { title: "TaskBoard Pro" }));

// API routes
app.use("/api/users", apiUsers);
app.use("/api/boards", apiBoards);

// 404 & errors
app.use((req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).json({ message: "Not found" });
  res.status(404).type("text").send("404 — Not Found");
});

app.use(globalERR);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));