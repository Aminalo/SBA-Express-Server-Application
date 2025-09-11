// Centralized error handler: JSON for API, EJS for pages
export default function globalERR(err, req, res, next) {
  const status  = err.status || 500;
  const message = err.message || "Internal Server Error";
  if (process.env.NODE_ENV !== "test") console.error("💥 Global Error:", err);
  if (req.path.startsWith("/api")) return res.status(status).json({ status, message });
  res.status(status).render("error", { status, message, stack: process.env.NODE_ENV === "production" ? null : err.stack });
}