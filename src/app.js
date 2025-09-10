// Minimal Express app (ESM) + EJS home page
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

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

app.get("/", (req, res) => res.render("home", { title: "TaskBoard Pro", message: "Hello 👋" }));

// 404 + basic error
app.use((req, res) => res.status(404).send("Not Found"));
app.use((err, req, res, next) => { console.error(err); res.status(500).send("Internal Error"); });

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));