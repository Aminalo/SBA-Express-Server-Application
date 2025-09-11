// Enforce Content-Type: application/json for API write operations
export default function requireJson(req, res, next) {
  const writes = ["POST","PUT","PATCH","DELETE"].includes(req.method);
  if (!req.path.startsWith("/api") || !writes) return next();
  const type = req.headers["content-type"] || "";
  if (!type.includes("application/json")) {
    return res.status(415).json({ status: 415, message: "Content-Type application/json required for API writes" });
  }
  next();
}