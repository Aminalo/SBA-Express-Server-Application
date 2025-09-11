import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// API routes (already created in commits 4–6)
import apiUsers from "./routes/api.users.mjs";
import apiBoards from "./routes/api.boards.mjs";
import apiTasks from "./routes/api.tasks.mjs";

// Pages routes (created in Commit 8)
import pageRoutes from "./routes/pages.mjs";

// Custom middlewares (created in Commit 7)
import globalERR from "./middleware/globalERR.mjs";
import requestTime from "./middleware/requestTime.mjs";
import requireJson from "./middleware/requireJson.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Core middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware
app.use(requestTime);  // adds req.requestTime
app.use(requireJson);  // enforces JSON for API writes

// Pages (EJS): home, boards list, board detail + form
app.use("/", pageRoutes);

// APIs (JSON)
app.use("/api/users",  apiUsers);
app.use("/api/boards", apiBoards);
app.use("/api/tasks",  apiTasks);

// 404: JSON for /api/*, EJS 404 for pages
app.use((req, res) => {
  if (req.path.startsWith("/api")) return res.status(404).json({ message: "Not found" });
  res.status(404).render("404", { url: req.originalUrl });
});

// Centralized error handler (JSON for API, EJS for pages)
app.use(globalERR);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});