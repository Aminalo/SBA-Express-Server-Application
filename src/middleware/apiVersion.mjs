// Adds API version header for any /api request
export default function apiVersion(req, res, next) {
  if (req.path.startsWith("/api")) res.setHeader("X-API-Version", "1.0");
  next();
}